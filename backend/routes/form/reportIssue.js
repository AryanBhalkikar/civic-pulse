import express from "express";
import bodyParser from "body-parser";
import pool from "../../config/db.js";

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateIssueId(lat, lng){
    const timestamp = Date.now();
    const cleanLat = String(lat).replace('.', '').replace('-', 'N');
    const cleanLng = String(lng).replace('.', '').replace('-', 'E');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();

    return `ISSUE-${timestamp}-${cleanLat}-${cleanLng}-${randomStr}`;
}

async function reportIssue(req, res, next){
    try{
        const issue_id = generateIssueId(req.body.lat, req.body.lng);
        const values = [
            issue_id, 
            req.body.title, 
            req.body.address, 
            req.body.lng, 
            req.body.lat, 
            req.body.description, 
            "open",
            new Date()
        ];
        const textCols = "INSERT INTO issues_display (issue_id, title, address, geom, description, status, last_reported_date) ";
        const textVals = "VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8)";
        const text = textCols + textVals;

        await pool.query(text, values);

        res.status(200).json({ message: "Data insert successful." });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default reportIssue;