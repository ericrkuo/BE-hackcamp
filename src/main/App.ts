import express, {Express} from 'express';
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(bodyParser.json());

        // await loadSampleData();

        registerRouters(app);

        app.listen(process.env.PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

function registerRouters(app: Express) {
    app.get('/', (req, res) => res.send('Express + TypeScript Server'));
}