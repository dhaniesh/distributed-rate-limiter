import { Request, Response, NextFunction } from "express";
import { allowRequest } from "./services/fixedWindow/fixedWindow";

export function rateLimiter(limit: number, windowSize: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || "unknown";
        const requestallowed = await allowRequest(ip, limit, windowSize)
        if (!requestallowed) {
            res.status(429).send("Too many requests");
            return;
        }
        next()
    };
}