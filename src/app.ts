import "./config/config"
import express  from "express";
import "express-async-errors";
import cors from "cors";
import {router} from "./routers";
import {errorHandler} from "./middlewares"

export const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);


