import { RateLimiterEntry, RedisStore } from "./types";
import { redisClient } from "./services/redis";
import { WINDOW_SIZE } from "..";

export const store: RedisStore = {
    async get(key: string): Promise<RateLimiterEntry | null> {
        const value = await redisClient.get(key);
        if (!value) return null
        return JSON.parse(value);
    },

    async set(key: string, value: RateLimiterEntry): Promise<void> {
        await redisClient.set(key, JSON.stringify(value), "PX", WINDOW_SIZE)
    },
    async del(key: string): Promise<void> {
        await redisClient.del(key)
    }
}