import axios, { AxiosError, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import qs from 'qs';

class SpoonacularService {

    constructor() {
        dotenv.config();
    }

    // Analyze a food image. Classify the image, guess the nutrition, and find a matching recipes.
    // 4 POINTS
    getImageAnalysis(imageURL: string): Promise<JSON> {
        // array of recipes, and array of nutrients
        // value and unit for ingredient
        return axios
            .get(
                // imageUrl=https://spoonacular.com/recipeImages/635350-240x150.jpg
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

    // Search through hundreds of thousands of recipes using advanced filtering and ranking.
    // 1 POINT and 0.01 POINTS PER RESULT
    searchRecipes(query: string): Promise<JSON> {
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
    getIngredientsByRecipeID(recipeID: string): Promise<JSON> {
        // todo: get array of ingredient names
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

    // Classify the recipe's cuisine.
    // 0.1 POINTS
    classifyCuisine(title: string, ingredientList: string): Promise<JSON> {
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

}

export { SpoonacularService };