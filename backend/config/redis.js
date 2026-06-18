import Redis from 'redis';
import { createNodeRedisClient } from 'bullmq';

const redisClient = Redis.createClient();
const connection = createNodeRedisClient(redisClient);

export default connection;