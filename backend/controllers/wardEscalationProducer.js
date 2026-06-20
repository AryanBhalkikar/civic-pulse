import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const escalationQueue = new Queue('escalation-queue', { connection: redisConnection });

async function wardEscalationProducer(issueId, lng, lat){
    try{
        const response = await escalationQueue.add('issue-escalation', {
            issueId: issueId,
            lng: lng,
            lat: lat
        });
    }
    catch(err){
        console.error(err.message);
    }
}

export default wardEscalationProducer;