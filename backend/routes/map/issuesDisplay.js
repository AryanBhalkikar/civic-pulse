import express from "express";
import bodyParser from "body-parser";
import pool from "../../config/db.js";

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function issuesDisplay(req, res, next){
    try{
        const issuesListData = await pool.query(
            'SELECT *, ST_X(geom) AS lng, ST_Y(geom) AS lat FROM issues_display'
        );
        const issuesList = issuesListData.rows;
        res.status(200).json(issuesList);
    }
    catch(err){
        res.status(500).json({ message:"Server Error Occurred" });
    }
}

export default issuesDisplay;