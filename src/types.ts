export interface Store {
    [key: string]: {
        count: number
        windowStart: number;
        expiresAt: number;
    } | null
}
