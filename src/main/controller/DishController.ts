import {NextFunction, Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import {DishRepository} from '../repository/DishRepository';
import {AddDishDTO} from "../interface/AddDishDTO";
import {Dish} from "../entity/Dish";
import {UserRepository} from "../repository/UserRepository";
import {CuisineType} from "../enum/CuisineType";
import {PointsService} from "../services/PointsService";
import {PointResult} from "../interface/PointResult";
import {Role} from "../enum/Role";
import {SpoonacularService} from "../services/SpoonacularService";
import {Nutrition} from "../entity/Nutrition";
import {Recipe} from "../entity/Recipe";

export class DishController {
    private spoonacularService: SpoonacularService = new SpoonacularService();

    // return all user
    listAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            // get users from database
            const dishRepository = getCustomRepository(DishRepository);
            const dishes = await dishRepository.find({
                relations: ['relatedRecipes', 'nutritions'],
            });

            // send the users object
            return res.status(200).send(dishes);
        } catch (e) {
            return next(e);
        }
    };

    // return one user
    getOneById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const id = req.params.id
            const dishRepository = getCustomRepository(DishRepository);
            const dish = await dishRepository.findOneOrFail(id, {
                relations: ['relatedRecipes', 'nutritions'],
            });
            return res.send(dish);
        } catch (e) {
            return next(e);
        }
    };

    // delete one user
    deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            // get the ID from the url
            const id = req.params.id
            const dishRepository = getCustomRepository(DishRepository);
            const result = await dishRepository.delete(id);
            return res.status(204).send(result);
        } catch (e) {
            next(e);
        }
    };

    /**
     * Add a dish to a users profile
     * * req param contains userId
     * * req body contains AddDishDTO
     * * 1. analyze image, get nutritional and recipe information
     * * 2. For each of recipe Id's, get list of ingredients
     * * 3. Take intersection of ingredients (remove duplicates)
     * * 4. Get cuisine (make sure to check is part of enum)
     * * 5. Create Dish entity and persist
     * * 6. Calculate points and add to user profile
     * */
    addDish = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            // get the ID from the url
            const userId = req.params.userId;
            const addDishDTO: AddDishDTO = req.body;

            const userRepository = getCustomRepository(UserRepository);
            const dishRepository = getCustomRepository(DishRepository);

            const user = await userRepository.findOneOrFail(userId);
            const previousDishes = await dishRepository.find();

            // 1. analyze image, get nutritional and recipe information
            let imageAnalysis = await this.spoonacularService.getImageAnalysis(req.params.url); // whats the url?
            let relatedRecipes = imageAnalysis[0] as Recipe[];
            let nutrients = imageAnalysis[1] as Nutrition[];

            // 2. For each of recipe Id's (take max 2), get list of ingredients
            let currIngredients: Array<Array<string>> = [];
            for (let i=0; i < 2; i++) {
                let currRecipeID = relatedRecipes[i].id;
                let ingredients: Array<string> = await this.spoonacularService.getIngredientsByRecipeID(currRecipeID);
                currIngredients.push(ingredients);
            }

            // 3. Take intersection of ingredients (remove duplicates)
            let finalIngredients;
            if(currIngredients.length === 2) {
                finalIngredients = currIngredients[0].filter(value => currIngredients[1].includes(value));
            } else {
                finalIngredients = currIngredients[0];
            }

            // 4. Get cuisine
            // todo: title of dish?
            let cuisine = await this.spoonacularService.classifyCuisine("userinputstring", finalIngredients.join("\n"));

            // 5. Create Dish entity and persist
            // todo: replace CuisineType with cuisine type we receive
            const dish = new Dish(user, relatedRecipes, nutrients, addDishDTO.name, cuisine, finalIngredients, "", "", addDishDTO.imageUrl)

            // 6. Calculate points and add to user profile
            const pointService = new PointsService();
            const pointsResult: PointResult = pointService.calculatePoints(dish, previousDishes);
            await userRepository.increment({role: Role.SUPER_USER}, "points", pointsResult.points)

            const result = await dishRepository.save(dish);
            // todo 7. format result with points
            return res.status(200).send(result);
        } catch (e) {
            next(e);
        }
    };
}
