import * as serverless from "serverless-http";
import * as express from "express";
import { GarageMonitorService } from "./service/garageMonitorService";

const app = express();
const myQService = new GarageMonitorService();

app.get("/", (req, res) => {
  res.send(myQService.monitor());
});

const handler = serverless(app);

export { handler };
