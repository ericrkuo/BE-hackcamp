import {Dish} from "../entity/Dish";
import {PointResult} from "../interface/PointResult";
import {CuisineType} from "../enum/CuisineType";
import {User} from "../entity/User";

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
    calculatePoints(newDish: Dish, user: User, previousDishes: Dish[]): PointResult {
        const pointResult: PointResult = {message: "", pointsGained: MAX_POINTS, previousPoints: user.points, totalPoints: user.points + MAX_POINTS};

        // 1. Get num dishes per cuisine
        const numDishesPerCuisine: Map<CuisineType, number> = new Map(Object.values(CuisineType).map((cuisineType: CuisineType) => {
            const numDishesForCuisine = previousDishes.filter((dish) => dish.cuisine == cuisineType)?.length ?? 0;
            return [cuisineType, numDishesForCuisine];
        }));

        // 2. Get average number of dishes per cuisine
        const sumDishes = Array.from(numDishesPerCuisine.values()).reduce((sum, current) => sum + current, 0)
        const avgNumDishesPerCuisine =  sumDishes / numDishesPerCuisine.size;

        // 3. Get original number of dishes for newDish's cuisine
        if (!numDishesPerCuisine.has(newDish.cuisine)) {
            throw new Error("Unsupported cuisine: " + newDish.cuisine);
        }
        const numDishesForNewDishCuisine = numDishesPerCuisine.get(newDish.cuisine)!!;

        // 4. If numDishes for newDish cuisine = 0 (means user trying new cuisine), give MAX_POINTS
        if (numDishesForNewDishCuisine === 0) {
            pointResult.message = `Congrats, you have tried a completely new cuisine: ${newDish.cuisine}!`
            return pointResult;
        }

        if (avgNumDishesPerCuisine <= 1) {
            pointResult.message = `Incredible, your taste has really began to grow! Share your dish to your friends and tell them about your love for ${newDish.cuisine} cuisine`
            return pointResult;
        }

        // 5. If numDishes for newDish cuisine > average, give MIN_POINTS
        if (numDishesForNewDishCuisine >= avgNumDishesPerCuisine) {
            pointResult.pointsGained = MIN_POINTS;
            pointResult.totalPoints = pointResult.pointsGained + pointResult.previousPoints
            pointResult.message = `Look delicious! Seems like you tend to like ${newDish.cuisine} cuisines. Click on recommend me to try new cuisines!`
            return pointResult;
        }

        // 6. Otherwise calculate 200 * ("newness" percentage)
        // at this point avgNumDishes guaranteed to be strictly less than numDishesForNewDishCuisine
        pointResult.pointsGained = MAX_POINTS * (100 - (numDishesForNewDishCuisine / avgNumDishesPerCuisine));
        pointResult.totalPoints = pointResult.pointsGained + pointResult.previousPoints
        pointResult.message = `Mmm even I want to try this. Be sure to share to your friends your new dish!`
        return pointResult;
    }
}