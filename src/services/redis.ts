import { RedisClient } from "bun";

export const redisClient = new RedisClient("redis://localhost:6379");
await redisClient.connect();