import express, { Request, Response } from "express";
import { rateLimiter } from "./src/rateLimiter";
import { initRedis } from "./src/services/redis";

const PORT = 3000;
const WINDOW_SIZE = 5000;
const REQUEST_LIMIT = 2;

const app = express();

app.get("/", rateLimiter(REQUEST_LIMIT, WINDOW_SIZE), (req: Request, res: Response) => {
    res.json({ "data": "sent", "status": "200" })
})

async function startServer() {
    try{
    await initRedis();
    app.listen(PORT, () => {
        console.log(`Server running on localhost:${PORT}`)
    })}
    catch(error){
        console.error(`Failed to start server`);
        process.exit(1);
    }
}
startServer();