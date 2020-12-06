import { EntityRepository, Repository } from 'typeorm';
import {Dish} from "../entity/Dish";

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {}
