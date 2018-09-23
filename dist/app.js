"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const serverless = require('serverless-http');
const serverless = require("serverless-http");
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world');
});
const handler = serverless(app);
exports.handler = handler;
//# sourceMappingURL=app.js.map