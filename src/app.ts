import * as serverless from "serverless-http";
import * as express from "express";
import { CloudWatchEventService } from "./service/cloudWatchEventService";
import * as _ from 'underscore';

const app = express();

const cloudWatchEventService = new CloudWatchEventService();

app.get("/events", async (req, res) => {
  const data = await cloudWatchEventService.getEvents('myq-garage-monitor-scheduled-event');
  res.send(data);
});

app.get("/events/:name", async (req, res) => {
  const data = await cloudWatchEventService.getEvents(req.params.name);
  res.send(_.first(data));
});

const handler = serverless(app);

export { handler };
