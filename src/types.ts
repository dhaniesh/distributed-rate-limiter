export type RateLimiterEntry = {
    count: number;
    windowStart: number;
    expiresAt: number;
}

export interface FixedWindowStore {
    get(key: string): Promise<RateLimiterEntry | null>
    set(key: string, value: RateLimiterEntry): Promise<void>
    del(key: string): Promise<void>
}