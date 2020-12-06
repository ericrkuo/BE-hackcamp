import {Request, Response, NextFunction} from 'express';
import {getCustomRepository} from 'typeorm';
import {UserRepository} from '../repository/UserRepository';
import {UserUpdateDTO} from "../interface/UserUpdateDTO";
import {Role} from "../enum/Role";

export class UserController {

    // return all user
    // NOTE: for now we are returning all of the super users friends
    listAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            // get users from database
            const userRepository = getCustomRepository(UserRepository);
            var users = await userRepository.find({
                where: {role: Role.FRIEND},
                relations: ['uploadedDishes', 'uploadedDishes.relatedRecipes', 'uploadedDishes.nutritions'],
            });

            // send the users object
            return res.status(200).send(users);
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
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findOneOrFail(id);
            return res.send(user);
        } catch (e) {
            return next(e);
        }
    };

    /**
     * We will only ever have one user with Role.SUPER_USER which will be created beforehand.
     * We give the illusion of "registering" a new user by just changing properties of the existing super user
     * */
    editSuperUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const userRepository = getCustomRepository(UserRepository);
            // get parameters from the body
            const userUpdateDTO: UserUpdateDTO = req.body;
            await userRepository.update({role: Role.SUPER_USER}, userUpdateDTO);
            const superUser = await userRepository.findOneOrFail({role: Role.SUPER_USER});
            res.status(200).send(superUser);
        } catch (e) {
            next(e);
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
            const userRepository = getCustomRepository(UserRepository);
            const result = await userRepository.delete(id);
            return res.status(204).send(result);
        } catch (e) {
            next(e);
        }
    };

    // get uploaded dishes of a user
    getUploaded = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            // get the id of user from the url
            const id = req.params.id
            const userRepository = getCustomRepository(UserRepository);
            const uploadedDishes = await userRepository.findOneOrFail(id, {
                relations: ['uploadedDishes', 'uploadedDishes.relatedRecipes', 'uploadedDishes.nutritions'],
            });

            return res.status(200).send(uploadedDishes);
        } catch (e) {
            next(e);
        }
    };

    getSuperUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const userRepository = getCustomRepository(UserRepository);
            const superUser = await userRepository.findOneOrFail({role: Role.SUPER_USER});
            res.status(200).send(superUser);
        } catch (e) {
            next(e);
        }
    };
}
