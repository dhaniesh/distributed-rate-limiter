import { Request, Response, NextFunction } from "express";
import { allowFixedRequest } from "./services/fixedWindow/fixedWindow";
import { allowLeakyRequest } from "./services/leakyBucket/leakyBucket";
import { allowTokenRequest } from "./services/tokenBucket/tokenBucket";

export function rateLimiter(limit: number, windowSize: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || "unknown";
        // const requestallowed = await allowFixedRequest(ip, limit, windowSize)
        // const requestallowed = await allowLeakyRequest(10)
        const requestallowed = await allowTokenRequest()
        if (!requestallowed) {
            res.status(429).send("Too many requests");
            return;
        }
        next()
    };
}