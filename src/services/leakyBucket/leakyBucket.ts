import { store } from "./store";
import { LEAKY_BUCKET_KEY, LEAK_RATE_PER_MS } from "./store";

export async function allowLeakyRequest(limit: number): Promise<boolean> {
    const now = Date.now()
    const entry = await store.get(LEAKY_BUCKET_KEY)
    // check if the request is new
    if (!entry) {
        await store.set(LEAKY_BUCKET_KEY, {
            lastLeak: now,
            level: 1
        })
        return true;
    }
    // calculate level
    const elapsed = now - entry.lastLeak;
    const leaked = elapsed * LEAK_RATE_PER_MS
    const newLevel = Math.max(0, entry.level - leaked)

    // check if new level exceeds limit
    if (newLevel + 1 > limit) {
        return false;
    }

    // if new level is within the limit, update store
    await store.set(LEAKY_BUCKET_KEY, {
        level: newLevel + 1,
        lastLeak: now
    });
    return true;
}   
