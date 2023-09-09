import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import schedule from "node-schedule";

import { backLinkRouter } from "./router/backlink";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { errorHandler } from "./middleware/errorHandler";
import { updateLinkStatus } from "./scheduleTask/scheduleTask";
import { healthRouter } from "./router/health";

const app = express();

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(":method :url :status :response-time ms "));
app.use(cookieParser());
app.use("/api/", backLinkRouter);
app.use("/healthz", healthRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

// run it every 1 min for testing
// TODO: Update cron schedule
const scheduleJob = schedule.scheduleJob("*/1 * * * *", async () => {
  console.log("Running schedule job to check link status....");
  await updateLinkStatus();
  console.log("Completed job....");
});

export default app;
