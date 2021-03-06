import { Router } from 'express';
import {DishController} from "../controller/DishController";

export class DishRouter {
  private dishRouter = Router();
  private dishController;

  constructor(dishController: DishController) {
    this.dishController = dishController;
  }

  getRoutes(): Router {
    // profile endpoint
    this.dishRouter.get('/', this.dishController.listAll);
    this.dishRouter.get('/:id', this.dishController.getOneById);
    this.dishRouter.delete('/:id', this.dishController.deleteDish);
    // will only be concerned with super user
    this.dishRouter.post('/', this.dishController.addDish)

    return this.dishRouter;
  }
}
