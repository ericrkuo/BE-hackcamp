import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Dish} from "./Dish";
import {CuisineType} from "../enum/CuisineType";
import {Role} from "../enum/Role";

/*
 * Represents a user in our application.
 * */
@Entity('user_profile')
export class User {

    constructor(email: string, username: string, profile_image: string, points: number, role: Role) {
        this.email = email;
        this.username = username;
        this.profile_image = profile_image;
        this.points = points;
        this.role = role;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /*
     * OneToMany bidirectional relationship between User and Dish
     * Each user can upload 0 or more dishes.
     * */
    @OneToMany(() => Dish, (dish) => dish.user, {
        cascade: true,
    })
    uploadedDishes: Dish[];

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    profile_image: string;

    @Column()
    points: number;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.FRIEND,
    })
    role: Role
}
