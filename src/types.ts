export type FixedWindowEntry = {
    count: number;
    windowStart: number;
    expiresAt: number;
}

export type LeakyBucketEntry = {
    level: number
    lastLeak: number
}

export interface FixedWindowStore {
    get(key: string): Promise<FixedWindowEntry | null>
    set(key: string, value: FixedWindowEntry): Promise<void>
    del(key: string): Promise<void>
}

export interface LeakyBucketStore {
    get(key: string): Promise<LeakyBucketEntry | null>
}