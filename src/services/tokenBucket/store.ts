import { TokenBucketStore, TokenBucketEntry } from "../../types";
import { redisClient } from "../redis";

export const store: TokenBucketStore = {
    async get(key: string): Promise<TokenBucketEntry | null> {
        const value = await redisClient.get(key)
        if (!value) {
            return null
        }
        return JSON.parse(value);
    },
    async set(key: string, value: TokenBucketEntry): Promise<void> {
        await redisClient.set(key, JSON.stringify(value))
    }
}