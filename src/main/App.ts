import express, {Express} from 'express';
import {createConnection, getCustomRepository} from "typeorm";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import {UserRepository} from "./repository/UserRepository";
import {DishRepository} from "./repository/DishRepository";
import {dishes_sample, users_sample} from "./resources/Data";
import {errorHandler} from "./middleware/ErrorHandler";
import {UserController} from "./controller/UserController";
import {UserRouter} from "./route/UserRouter";
import {DishRouter} from "./route/DishRouter";
import {DishController} from "./controller/DishController";


createConnection()
    .then(async (connection) => {
        dotenv.config();
        const app = express();
        app.use(bodyParser.json());

        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: "http://localhost:3000",
            preflightContinue: false,
        };

        app.use(cors(options))
        await loadSampleData();

        registerRouters(app);
        // register handlers AFTER registering routes\
        app.use(errorHandler);

        app.listen(process.env.PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

function registerRouters(app: Express) {
    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    const userController = new UserController();
    const userRouter = new UserRouter(userController);
    app.use('/users', userRouter.getRoutes());

    const dishController = new DishController();
    const dishRouter = new DishRouter(dishController);
    app.use('/dishes', dishRouter.getRoutes());
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