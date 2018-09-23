// const serverless = require('serverless-http');
import * as serverless from "serverless-http";
import * as express from "express";
import { MyQService } from "./service/myQService";

const app = express();
const myQService = new MyQService();

app.get("/", (req, res) => {
  res.send(myQService.process());
});

const handler = serverless(app);

export { handler };
