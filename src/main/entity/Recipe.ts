import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Dish} from "./Dish";
import {User} from "./User";

@Entity()
export class Recipe {

    constructor(recipeId: string, title: string, url: string) {
        this.recipeId = recipeId;
        this.title = title;
        this.url = url;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /*
     * ManyToOne bidirectional relationship between Recipe and Dish
     * On delete cascade on foreign key dishId
     * Recipe is the owning side of this association, contains column dishId
     * */
    @ManyToOne(() => Dish, (dish) => dish.relatedRecipes, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    dish: Dish

    @Column()
    recipeId: string;

    @Column()
    title: string

    @Column()
    url: string
}