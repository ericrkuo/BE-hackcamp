import axios, { AxiosError, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import qs from 'qs';
import {Recipe} from "../entity/Recipe";
import {Nutrition} from "../entity/Nutrition";
import {ImageAnalysisNutrient} from "../data/ImageAnalysisNutrient";
import {CuisineType} from "../enum/CuisineType";

class SpoonacularService {

    constructor() {
        dotenv.config();
    }

    // Analyze a food image. Classify the image, guess the nutrition, and find a matching recipes.
    // 4 POINTS
    async getImageAnalysis(imageURL: string): Promise<Array<Array<Recipe|Nutrition>>> {
        return axios
            .get(
                'https://api.spoonacular.com/food/images/analyze?',
                {
                    params: {
                        imageUrl: imageURL,
                        apiKey: process.env.SPOONACULAR_KEY,
                    },
                }
            )
            .then((response: AxiosResponse) => {
                const result: JSON = response.data;

                let recipes: Recipe[]  = [];
                let nutrients: Nutrition[] = [];

                for(let recipe of response.data.recipes) {
                    let currRecipe = new Recipe(recipe.id, recipe.title, recipe.url);
                    recipes.push(currRecipe);
                }

                for (let [key, value] of Object.entries(response.data.nutrition)) {
                    if (value && typeof value === 'object') {
                        let currVal = value as ImageAnalysisNutrient;
                        let currNutrient = new Nutrition(key, currVal.value, currVal.unit);
                        nutrients.push(currNutrient);
                    }
                }
                return Promise.resolve([ recipes, nutrients ]);
            })
            .catch((err: AxiosError) => {
                //API error message
                console.log(err?.response?.data?.error);

                //Axios entire error message
                console.log(err);

                return Promise.reject(err);
            });
    }

    // Search through hundreds of thousands of recipes using advanced filtering and ranking.
    // 1 POINT and 0.01 POINTS PER RESULT
    async searchRecipes(query: string): Promise<JSON> {
        const queryURI: string = encodeURIComponent(query);

        return axios
            .get(
                'https://api.spoonacular.com/recipes/complexSearch?' + queryURI,
                {
                    params: {
                        apiKey: process.env.SPOONACULAR_KEY,
                    },
                }
            )
            .then((response: AxiosResponse) => {
                const result: JSON = response.data;
                return Promise.resolve(result);
            })
            .catch((err: AxiosError) => {
                //API error message
                console.log(err?.response?.data?.error);

                //Axios entire error message
                console.log(err);

                return Promise.reject(err);
            });
    }

    // Get a recipe's ingredient list.
    // 1 POINT
    async getIngredientsByRecipeID(recipeID: string): Promise<Array<string>> {
        return axios
            .get(
                'https://api.spoonacular.com/recipes/' + recipeID + '/ingredientWidget.json?',
                {
                    params: {
                        apiKey: process.env.SPOONACULAR_KEY,
                    },
                }
            )
            .then((response: AxiosResponse) => {
                let ingredients: string[] = [];

                for(let ingredient of response.data.ingredients) {
                    let name: string = ingredient.name;
                    ingredients.push(name);
                }
                return Promise.resolve(ingredients);
            })
            .catch((err: AxiosError) => {
                //API error message
                console.log(err?.response?.data?.error);

                //Axios entire error message
                console.log(err);

                return Promise.reject(err);
            });
    }

    // Classify the recipe's cuisine.
    // 0.1 POINTS
    async classifyCuisine(title: string, ingredientList: string): Promise<CuisineType> {
        let data = qs.stringify({title: title, ingredientList: ingredientList});

        return axios
            .post(
                'https://api.spoonacular.com/recipes/cuisine?apiKey=' + process.env.SPOONACULAR_KEY,
                data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            )
            .then((response: AxiosResponse) => {
                const cuisineType = response.data.cuisine as CuisineType;
                return Promise.resolve(cuisineType);
            })
            .catch((err: AxiosError) => {
                //API error message
                console.log(err?.response?.data?.error);

                //Axios entire error message
                console.log(err);

                return Promise.reject(err);
            });
    }

}

export { SpoonacularService };