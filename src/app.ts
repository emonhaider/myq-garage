import * as serverless from "serverless-http";
import * as express from "express";
import { GarageMonitorService } from "./service/garageMonitorService";
import { MyQService } from "./service/myQService";
const app = express();

const myQService = new MyQService();
const garageMonitorService = new GarageMonitorService(myQService);

app.get("/", (req, res) => {
  res.send(garageMonitorService.monitor());
});

const handler = serverless(app);

export { handler };
