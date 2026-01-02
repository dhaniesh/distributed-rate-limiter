import { store } from "./store";

export function allowRequest(
    key: string,
    limit: number,
    windowSize: number
): boolean {
    const now = Date.now();
    const entry = store[key];
    // check if the request is new or the window got exired
    if (!entry || now > entry.expiresAt) {
        store[key] = {
            count: 1,
            windowStart: now,
            expiresAt: now + windowSize
        }
        return true;
    }
    // check if the request count is within the limit
    if (entry.count < limit) {
        entry.count += 1;
        return true;
    }
    return false;
};