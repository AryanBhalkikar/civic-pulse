import Redis from 'redis';
import { createNodeRedisClient } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = Redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
const connection = createNodeRedisClient(redisClient);

export default connection;