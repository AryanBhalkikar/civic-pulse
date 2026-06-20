import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import transporter from "../config/nodemailer.js";
import dotenv from 'dotenv';

dotenv.config();

const emailDeliveryWorker = new Worker('email-queue', async(job) => {
    try{
        const { emailAddress, emailSubject, emailBody } = job.data;

        /*
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: process.env.TESTER_EMAIL,
            subject: emailSubject,
            text: emailBody,
        });
        */
        console.log("Message sent");

    }
    catch(err){
        console.log("emailDeliveryWorker.js throws err:")
        console.error(err);
    }    
}, {
    connection: redisConnection,
});