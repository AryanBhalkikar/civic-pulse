import pool from "../../config/db.js";

async function emailsReject(req, res, next){
    try{
        const { id } = req.params;
        const emailQueryText = "UPDATE outbound_email_drafts SET status = 'REJECTED' WHERE id = $1";

        const response = await pool.query(emailQueryText, [id]);

        console.log("Email successfuly rejected");
        res.status(200).json({ message: "Email rejection successful." });
    }
    catch(err){
        console.log("emailsReject throws err:");
        console.err(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default emailsReject;