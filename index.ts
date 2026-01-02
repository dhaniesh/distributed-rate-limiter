import express, { Request, Response } from "express";
import { rateLimiter } from "./src/rateLimiter";

const PORT = 3000;
const app = express();
app.use(rateLimiter(2, 5000));

app.get("/", (req: Request, res: Response) => {
    res.json({ "data": "sent", "status": "200" })
})

app.listen(PORT, () => {
    console.log(`Server running on localhost ${PORT}`)
})