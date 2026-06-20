import pool from "../config/db.js";
import dotenv from "dotenv";
import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import Groq from 'groq-sdk';
import emailDeliveryQueue from "./emailDeliveryQueue.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const escalationWorker = new Worker('escalation-queue', async(job) => {
    try{
        const wardDetailsText = "SELECT w.ward_name, z.zone_name, z.officer_designation, " + 
        "z.office_email FROM bengaluru_wards w JOIN zone_contacts z ON w.zone_id = z.zone_id " +
        "WHERE ST_Contains(w.geom, ST_SetSRID(ST_MakePoint($1, $2), 4326))";

        const contactsResponse = await pool.query(wardDetailsText, [job.data.lng, job.data.lat]);
        const contactDetails = contactsResponse.rows[0];

        const issueDetailsText = "SELECT title, left(description, 255) FROM issues_all " + 
        "WHERE issue_id = $1 LIMIT 5";

        const issueDetailsResponse = await pool.query(issueDetailsText, [job.data.issueId]);
        const issueDetails = issueDetailsResponse.rows;

        let clubbedDescription = "Description: ";
        for (let i = 0; i < issueDetails.length; i++){
            clubbedDescription += issueDetails[i].left + " ... ";
        }

        const userPrompt = `
        Draft an escalation email using the following details:
        Issue Type = ${issueDetails[0].title},
        Ward = ${contactDetails.ward_name},
        Zone = ${contactDetails.zone_name},
        Coordinates: latitude = ${job.data.lat}, longitude = ${job.data.lng},
        Description: ${clubbedDescription}
        `;

        const systemPrompt = `You are an automated civic operations assistant for CivicPulse Bengaluru. 
        Your job is to generate a highly professional, polite, and actionable escalation email to a BBMP Municipal Chief Engineer. 
        Do not include any pleasantries or conversational filler outside the email structure. Return ONLY the body text of the email.`;

        const aiResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.3
        });

        const emailBody = aiResponse.choices[0]?.message?.content;
        const emailSubject = `Reporting Urgent Civic Infrastructure Issue in ${contactDetails.ward_name}`;

        if (!emailBody) throw new Error("Groq failed to generate email text.");

        const outboundEmailDbText = "INSERT INTO outbound_email_drafts " + 
        "(issue_id, email_address, email_subject, email_body) VALUES ($1, $2, $3, $4)";

        await pool.query(outboundEmailDbText, [
            job.data.issueId,
            contactDetails.office_email,
            emailSubject,
            emailBody
        ]);

        await emailDeliveryQueue.add('outbound-email', {
            emailAddress: contactDetails.office_email,
            emailSubject: emailSubject,
            emailBody: emailBody
        }, {
            attempts: 5,
            backoff: { type: 'exponential', delay: 5000 }
        });

        console.log(`Email draft successfully logged for ${contactDetails.ward_name}`);
    }
    catch(err){
        console.log("wardEscalationWorker throws err:");
        console.error(err.message);
    }
}, { 
    connection: redisConnection,
    limiter: {
        max: 5,
        duration: 1000*60,
    }
});
