import path from "path";

require('dotenv').config()
import "regenerator-runtime/runtime";
import 'cross-fetch/polyfill';
import express from 'express';
const cookieParser = require("cookie-parser");
import { response } from "./response";

process.env.IS_SERVER = 'true';

const port = process.env.PORT || 8080;
const app = express();

app.use(function(req, res, next) {
  console.log(req.url);
  next();
});

app.use(cookieParser());
console.log(`dirname: ${__dirname}`);
app.use(express.static(path.join(__dirname, '../..'))); //todo fix dirname
console.log(__dirname);

app.get('*', response);

app.listen(port);
console.log("server started on port " + port);