import express, {Express} from 'express';
import {createConnection, getCustomRepository} from "typeorm";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {UserRepository} from "./repository/UserRepository";
import {DishRepository} from "./repository/DishRepository";
import {dishes_sample, users_sample} from "./resources/Data";

const app = express();
dotenv.config();

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(bodyParser.json());

        await loadSampleData();

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

async function loadSampleData() {
    const userRepository = getCustomRepository(UserRepository);
    const dishRepository = getCustomRepository(DishRepository);

    for (let user of users_sample) {
        await userRepository.save(user);
    }

    for (let dish of dishes_sample) {
        await dishRepository.save(dish)
    }

    const users = await userRepository.find({relations: ['uploadedDishes', 'uploadedDishes.relatedRecipes', 'uploadedDishes.nutritions']});
    const dishes = await dishRepository.find({relations: ['relatedRecipes', 'nutritions', 'user']});
    console.log();
}