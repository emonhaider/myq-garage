// const serverless = require('serverless-http');
import * as serverless from 'serverless-http';
import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

const handler = serverless(app);

export { handler };
