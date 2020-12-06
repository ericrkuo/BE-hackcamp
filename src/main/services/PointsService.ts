import {Dish} from "../entity/Dish";
import {PointResult} from "../interface/PointResult";

export const MAX_POINTS = 200;
export const MIN_POINTS = 25;
export class PointsService {

    /**
     * Calculates points to add based on new dish added
     * * 1. Get num dishes per cuisine
     * * 2. Get average number of dishes per cuisine
     * * 3. Get original number of dishes for newDish's cuisine
     * * 4. If numDishes for newDish cuisine = 0 (means user trying new cuisine), give MAX_POINTS
     * * 5. If numDishes for newDish cuisine > average, give MIN_POINTS
     * * 6. Otherwise calculate 200 * ("newness" percentage)
     * * 7. Return with respective message
     * */
    calculatePoints(newDish: Dish, previousDishes: Dish[]): PointResult {
        const pointResult: PointResult = {message: "", points: 0};
        return pointResult;
    }
}