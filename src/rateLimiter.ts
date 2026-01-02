import { Request, Response, NextFunction } from "express";
import { allowRequest } from "./fixedWindow";

export function rateLimiter(limit: number, windowSize: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || "unknown";
        if (!allowRequest(ip, limit, windowSize)) {
            res.status(429).send("Too many requests");
            return;
        }
        next()
    };
}