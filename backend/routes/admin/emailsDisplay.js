import pool from "../../config/db.js";

async function emailsDisplay(req, res, next){
    try{
        const getPendingEmailsText = "SELECT * FROM outbound_email_drafts WHERE status = 'PENDING'";
        const response = await pool.query(getPendingEmailsText);
        const emailList = response.rows;
        res.status(200).json(emailList);
    }
    catch(err){
        console.log("emailsDisplay throws err:");
        console.err(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default emailsDisplay;