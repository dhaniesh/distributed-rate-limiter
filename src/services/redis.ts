import { RedisClient } from "bun";

export const redisClient = new RedisClient("redis://localhost:6379", {
    connectionTimeout: 1000
});
export async function initRedis() {
    try {
        console.log("Trying to connect to redis");

        await redisClient.connect();
        console.log("Connected to redis");
    }
    catch (error) {
        console.log(`Failed to connect to redis, Error: ${error}`);
        throw error
    }
}