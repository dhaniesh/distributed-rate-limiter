import { store } from "./store";

const TOKEN_BUCKET_KEY = "TOKEN_BUCKET_KEY";
const REFILL_RATE = 1 / 5000
const CAPACITY = 5

export async function allowTokenRequest(): Promise<boolean> {
    const now = Date.now()
    const entry = await store.get(TOKEN_BUCKET_KEY)

    // first requests comes in
    if (!entry) {
        await store.set(TOKEN_BUCKET_KEY, {
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
        await store.set(TOKEN_BUCKET_KEY, {
            level: newLevel - 1,
            lastRefill: now
        })
        return true;
    }
    return false;

}