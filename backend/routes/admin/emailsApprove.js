import pool from "../../config/db.js";
import emailDeliveryQueue from "../../controllers/emailDeliveryQueue.js";

async function emailsApprove(req, res, next){
    try{
        const { id } = req.params;
        const emailQueryText = "UPDATE outbound_email_drafts SET status = 'APPROVED' WHERE id = $1 " + 
        "RETURNING *";

        const response = await pool.query(emailQueryText, [id]);

        const emailData = response.rows[0];

        await emailDeliveryQueue.add('outbound-email', {
            emailAddress: emailData.emailAddress,
            emailSubject: emailData.emailSubject,
            emailBody: emailData.emailBody
        }, {
            attempts: 5,
            backoff: { type: 'exponential', delay: 5000 }
        });

        console.log("Email successfuly added to queue");
        res.status(200).json({ message: "Email approval successful." });
    }
    catch(err){
        console.log("emailsApprove throws err:");
        console.err(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default emailsApprove;