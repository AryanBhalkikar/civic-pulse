import pool from "../config/db.js";
import wardEscalationProducer from "./wardEscalationProducer.js";

function generatedUnclubbedIssueId(lat, lng){

    const timestamp = Date.now();
    const cleanLat = String(lat).replace('.', '').replace('-', 'N');
    const cleanLng = String(lng).replace('.', '').replace('-', 'E');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();

    return `ISSUE-${timestamp}-${cleanLat}-${cleanLng}-${randomStr}-UNCLUBBED`;
}

function generateClubbedIssueId(lat, lng, issueTitle){
    
    const cleanIssueTitle = issueTitle.replace(' ', '');
    const cleanLat = String(lat).replace('.', '').replace('-', 'N');
    const cleanLng = String(lng).replace('.', '').replace('-', 'E');

    return `ISSUE-${cleanIssueTitle}-${cleanLat}-${cleanLng}-CLUBBED`;
}

async function issueController(req, res, next){
    try{
        const rateLimitText = "SELECT COUNT(*) FROM issues_all WHERE user_email = $1 AND "+
        "reported_date >= NOW() - INTERVAL '24 hours';";

        const rateLimitResponse = await pool.query(rateLimitText, [req.user.email]);
        const userRequestCount = parseInt(rateLimitResponse.rows[0].count);

        if (userRequestCount >= 3){
            return res.status(400).json({ message: "Daily submission limit reached. " + 
                "You can only report up to 3 issues every 24 hours." });
        }

        const checkExistanceText = "SELECT issue_id, report_count FROM issues_display " + 
        "WHERE title = $1 AND status = 'open' AND " + 
        "ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, 40) " + 
        "LIMIT 1;";
        
        const checkExistanceData = [
            req.body.title,
            req.body.lng,
            req.body.lat,
        ];

        const checkExistanceResponse = await pool.query(checkExistanceText, checkExistanceData);
        const existingIssue = checkExistanceResponse.rows[0];

        const issueIdUnclubbed = generatedUnclubbedIssueId(req.body.lat, req.body.lng);
        const issueIdClubbed = generateClubbedIssueId(req.body.lat, req.body.lng, req.body.title);
        const issuesAllData = [
            issueIdUnclubbed,
            issueIdClubbed,
            req.user.email,
            req.body.title,
            req.body.address,
            "open",
            req.body.lng,
            req.body.lat,
            new Date(),
            req.body.description
        ];
        const issuesAllText = "INSERT INTO issues_all VALUES " + 
        "($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326), $9, $10)";

        if (checkExistanceResponse.rows.length === 0){
            const issuesDisplayData = [
                issueIdClubbed,
                req.body.title,
                req.body.address,
                "open",
                req.body.lng,
                req.body.lat,
                1,
                new Date()
            ];
            const issuesDisplayText = "INSERT INTO issues_display " +
            "(issue_id, title, address, status, geom, report_count, last_reported_date) " + 
            "VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), $7, $8)";

            await pool.query(issuesDisplayText, issuesDisplayData);
        }
        else{
            const checkDuplicateQueryText = "SELECT 1 FROM issues_all WHERE issue_id = $1 AND " + 
            "user_email = $2 LIMIT 1";

            const checkDuplicateResponse = await pool.query(checkDuplicateQueryText, [
                existingIssue.issue_id,
                req.user.email
            ]);
            
            if (checkDuplicateResponse.rows.length > 0){
                return res.status(400).json({ message: "You have already reported this issue." });
            }

            const updateIssuesDisplayText = "UPDATE issues_display " + 
            "SET report_count = $1 WHERE issue_id = $2";

            const updateIssuesDisplayData = [
                existingIssue.report_count + 1,
                existingIssue.issue_id
            ];

            await pool.query(updateIssuesDisplayText, updateIssuesDisplayData);

            issuesAllData[1] = existingIssue.issue_id; //issuesAllData[1] is issueIdClubbed

            if (existingIssue.report_count + 1 === 5){
                wardEscalationProducer(existingIssue.issue_id, req.body.lng, req.body.lat);
            }
        }

        await pool.query(issuesAllText, issuesAllData);

        res.status(200).json( {message: "Submission successful."} );
    }
    catch (err){
        console.log("issueController throws err:");
        console.log(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default issueController;