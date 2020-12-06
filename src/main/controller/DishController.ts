import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { DishRepository } from '../repository/DishRepository';

export class DishController {

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
}
