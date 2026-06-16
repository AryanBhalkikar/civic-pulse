import express from "express";
import bodyParser from "body-parser";
import pool from "../../config/db.js";

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function clubbedIssuesDisplay(req, res, next){
    try{
        const issueId = req.query.issue_id;
        const text = "SELECT *, ST_X(geom) AS lng, ST_Y(geom) AS lat FROM issues_all WHERE issue_id = $1";

        const response = await pool.query(text, [issueId]);
        res.status(200).json(response.rows);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default clubbedIssuesDisplay;