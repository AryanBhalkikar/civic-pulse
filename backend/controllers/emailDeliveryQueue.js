import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const emailDeliveryQueue = new Queue('email-queue', { connection: redisConnection });

export default emailDeliveryQueue;