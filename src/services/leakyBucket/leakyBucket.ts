import { store } from "./store";

export const LEAK_RATE_PER_MS = 1/1000;

export async function allowLeakyRequest(key: string, limit: number): Promise<boolean> {
    const now = Date.now()
    const entry = await store.get(key)
    // calculate expiration with 1 sec buffer
    const expiration = limit / LEAK_RATE_PER_MS + 1000;
    // check if the request is new
    if (!entry) {
        await store.set(key, {
            lastLeak: now,
            level: 1
        }, expiration)
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
    await store.set(key, {
        level: newLevel + 1,
        lastLeak: now
    }, expiration);
    return true;
}   
