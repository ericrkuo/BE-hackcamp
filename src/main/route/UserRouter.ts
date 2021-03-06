import { Router } from 'express';
import { UserController } from '../controller/UserController';

export class UserRouter {
  private userRouter = Router();
  private userController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  getRoutes(): Router {
    // profile endpoint
    this.userRouter.get('/', this.userController.listAll);
    this.userRouter.get('/superUser', this.userController.getSuperUser);
    this.userRouter.get('/:id', this.userController.getOneById);
    this.userRouter.patch('/superUser', this.userController.editSuperUser);
    this.userRouter.delete('/:id', this.userController.deleteUser);
    // get uploaded dishes endpoint
    this.userRouter.get(
      '/:id/uploadedDishes/',
      this.userController.getUploaded
    );

    return this.userRouter;
  }
}
