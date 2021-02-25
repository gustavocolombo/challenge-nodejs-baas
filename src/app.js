import express from 'express';
import Mongoconnection from './configs/MongoConnection';
import bodyParser from 'body-parser';
import Routes from "./routes";
import morgan from 'morgan';
import cors from 'cors';

import { Cors } from './middlewares/Cors';

let dbConnection = new Mongoconnection();
dbConnection.connect();

const app = express();

app.use(morgan("tiny"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(Cors)

app.use('/api', new Routes(express.Router()).registerRoutes())

export default app