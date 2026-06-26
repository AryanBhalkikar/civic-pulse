import pool from "../../config/db.js";

async function resolveIssue(req, res, next){
    const { issueId } = req.params;
    const userId = req.user.id;

    try{
        const recordVoteText = "INSERT INTO issue_resolutions (issue_id, user_id) VALUES ($1, $2)";
        await pool.query(recordVoteText, [issueId, userId]);

        const countVotesText = "SELECT COUNT(*) FROM issue_resolutions WHERE issue_id = $1";
        const response = await pool.query(countVotesText, [issueId]);
        const resolutionVotes = parseInt(response.rows[0].count);

        if (resolutionVotes >= 5){
            const deleteIssueText = "DELETE FROM issues_display WHERE issue_id = $1";
            await pool.query(deleteIssueText, [issueId]);

            const markResolvedText = "UPDATE issues_all SET status = 'resolved' WHERE issue_id = $1";
            await pool.query(markResolvedText, [issueId]);
        }

        return res.status(200).json({ message: "Vote Successful" });
    }
    catch(err){
        if (err.code === '23505') {
            return res.status(400).json({ message: "You have already marked this issue as resolved." });
        }
        if (err.code === '23503'){
            return res.status(400).json({ message: "This issue has already been resolved." });
        }
        console.log("resolveIssue throws err:");
        console.log(err.message);
        res.status(500).json({ message: "Server error occurred." });
    }
}

export default resolveIssue;