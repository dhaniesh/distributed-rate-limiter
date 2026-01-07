import { store } from "./store";

const TOKEN_BUCKET_KEY = "TOKEN_BUCKET_KEY";
const REFILL_RATE = 1 / 5000
const CAPACITY = 5

export async function allowTokenRequest(ip: string): Promise<boolean> {
    const now = Date.now()
    const entry = await store.get(ip)

    // first requests comes in
    if (!entry) {
        await store.set(ip, {
            level: CAPACITY - 1,
            lastRefill: now
        })
        return true;
    }

    // subsequent requests - allow or block
    const elapsed = now - entry.lastRefill
    const refilled = elapsed * REFILL_RATE
    const newLevel = Math.min(CAPACITY, refilled + entry.level)

    if (newLevel >= 1) {
        await store.set(ip, {
            level: newLevel - 1,
            lastRefill: now
        })
        return true;
    }
    return false;

}