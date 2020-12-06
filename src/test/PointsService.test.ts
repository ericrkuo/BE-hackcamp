import {PointsService} from "../main/services/PointsService";
import {dishes_sample, users_sample} from "../main/resources/Data";

describe('Testing endpoints for PointsService', function () {
    const pointsService = new PointsService();

    test('Testing image analysis', () => {
        try {
            const result = pointsService.calculatePoints(dishes_sample[0], users_sample[0], dishes_sample);
            console.log(result);
        } catch (e) {
            console.log("Should not have failed");
        }
    });
});
