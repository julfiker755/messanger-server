import express, { Application } from "express";
import type { Request, Response } from "express";
import cors from "cors";
// import httpStatus from "http-status";
const app: Application = express();
import cookieParser from "cookie-parser";
import router from "./routes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is Running 😍",
  });
});

// app.use("/api/v1",router)

export default app;
