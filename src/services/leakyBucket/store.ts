import { LeakyBucketStore, LeakyBucketEntry } from "../../types";
import { redisClient } from "../redis";

export const store: LeakyBucketStore = {
    async get(key: string): Promise<LeakyBucketEntry | null> {
        const value = await redisClient.get(key)
        if (!value) return null
        return JSON.parse(value)
    },
    async set(key: string, value: LeakyBucketEntry, expiration: number): Promise<void> {
        await redisClient.set(key, JSON.stringify(value), "PX", expiration)
    }
}