export type FixedWindowEntry = {
    count: number;
    windowStart: number;
    expiresAt: number;
}

export type LeakyBucketEntry = {
    level: number
    lastLeak: number
}

export type TokenBucketEntry = {
    level: number
    lastRefill: number
}

export interface FixedWindowStore {
    get(key: string): Promise<FixedWindowEntry | null>
    set(key: string, value: FixedWindowEntry, windowSize: number): Promise<void>
    del(key: string): Promise<void>
}

export interface LeakyBucketStore {
    get(key: string): Promise<LeakyBucketEntry | null>
    set(key:string, value: LeakyBucketEntry): Promise<void>
}

export interface TokenBucketStore {
    get(key: string): Promise<TokenBucketEntry | null>
    set(key: string, value: TokenBucketEntry): Promise<void>
}