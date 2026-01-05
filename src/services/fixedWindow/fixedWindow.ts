import { store } from "./store";

export async function allowFixedRequest(
    key: string,
    limit: number,
    windowSize: number
): Promise<boolean> {
    const now = Date.now();
    const entry = await store.get(key);
    // check if the request is new or the window got exired
    if (!entry || now > entry.expiresAt) {
        store.set(key, {
            count: 1,
            windowStart: now,
            expiresAt: now + windowSize
        })
        return true;
    }
    // check if the request count is within the limit
    if (entry.count < limit) {
        entry.count += 1;
        await store.set(key, entry)
        return true;
    }
    return false;
};