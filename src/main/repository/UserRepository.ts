import { EntityRepository, Repository } from 'typeorm';
import {Dish} from "../entity/Dish";
import {User} from "../entity/User";

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
