import { LeakyBucketStore, LeakyBucketEntry } from "../../types";
import { redisClient } from "../redis";

export const LEAKY_BUCKET_KEY = "LEAKY_BUCKET_KEY"
export const LEAK_RATE_PER_MS = 1/1000;

export const store: LeakyBucketStore = {
    async get(LEAKY_BUCKET_KEY){
        const value = await redisClient.get(LEAKY_BUCKET_KEY)
        if (!value) return null
        return JSON.parse(value)
    },
    async set(LEAKY_BUCKET_KEY, value){
        await redisClient.set(LEAKY_BUCKET_KEY, JSON.stringify(value))
    }
}