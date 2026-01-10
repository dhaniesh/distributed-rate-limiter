import { FixedWindowEntry, FixedWindowStore } from "../../types";
import { redisClient } from "../redis";

export const store: FixedWindowStore = {
    async get(key: string): Promise<FixedWindowEntry | null> {
        const value = await redisClient.get(key);
        if (!value) return null
        return JSON.parse(value);
    },
    async set(key: string, value: FixedWindowEntry, windowSize: number): Promise<void> {
        await redisClient.set(key, JSON.stringify(value), "PX", windowSize)
    },
    async del(key: string): Promise<void> {
        await redisClient.del(key)
    }
}