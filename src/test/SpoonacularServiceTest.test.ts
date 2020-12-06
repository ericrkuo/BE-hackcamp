import { AxiosError } from 'axios';
import { SpoonacularService } from '../main/services/SpoonacularService';
import * as dotenv from 'dotenv';
import {CuisineType} from "../main/enum/CuisineType";
import {Recipe} from "../main/entity/Recipe";
import {Nutrition} from "../main/entity/Nutrition";

describe('Testing endpoints for Spoonacular', function () {
    const spoonacularService = new SpoonacularService();

    beforeEach(function () {
        dotenv.config();
    });

    test('Testing image analysis', () => {
        return spoonacularService.getImageAnalysis("https://spoonacular.com/recipeImages/635350-240x150.jpg")
            .then((result: (Recipe | Nutrition)[][]) => {
                console.log(result);
            }).catch((error: AxiosError) => {
                fail('Did not expect to fail: ' + error.message);
            });
    });

    test("Testing search recipe", () => {
        return spoonacularService.searchRecipes("query=pasta")
            .then((result: JSON) => {
                console.log(result);
            }).catch((error: AxiosError) => {
                fail('Did not expect to fail: ' + error.message);
            });
    });

    test("Get ingredients by recipe ID", () => {
        return spoonacularService.getIngredientsByRecipeID("1003464")
            .then((result: string[]) => {
                console.log(result);
            }).catch((error: AxiosError) => {
                fail('Did not expect to fail: ' + error.message);
            });
    });

    test("Classify cuisine", () => {
        return spoonacularService.classifyCuisine("Pork roast with green beans", "3 oz pork shoulder")
            .then((result: CuisineType) => {
                console.log(result);
            }).catch((error: AxiosError) => {
                fail('Did not expect to fail: ' + error.message);
            });

    });


});
