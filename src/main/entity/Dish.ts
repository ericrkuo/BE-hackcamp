import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {User} from "./User";
import {CuisineType} from "../enum/CuisineType";
import {Recipe} from "./Recipe";
import {Nutrition} from "./Nutrition";

/*
 * Represents a user in our application.
 * */
@Entity()
export class Dish {

    constructor(user: User, relatedRecipes: Recipe[], nutritions: Nutrition[], name: string, cuisine: CuisineType, ingredients: string[], latitude: string, longitude: string, imageUrl: string) {
        this.user = user;
        this.relatedRecipes = relatedRecipes;
        this.nutritions = nutritions;
        this.name = name;
        this.cuisine = cuisine;
        this.ingredients = ingredients;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /*
     * ManyToOne bidirectional relationship between Dish and User
     * Many promotions can be owned/uploaded by one user
     * On delete cascade on foreign key userId
     * Dish is the owning side of this association, contains column userId
     * */
    @ManyToOne(() => User, (user) => user.uploadedDishes, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    /*
     * OneToMany bidirectional relationship between Dish and Recipe
     * Each dish can have 0 or more related recipes
     * */
    @OneToMany(() => Recipe, (recipe) => recipe.dish, {
        cascade: true,
    })
    relatedRecipes: Recipe[];

    /*
     * OneToMany bidirectional relationship between Dish and Nutrition
     * Each dish can have 0 or more nutritions
     * */
    @OneToMany(() => Nutrition, (nutrition) => nutrition.dish, {
        cascade: true,
    })
    nutritions: Nutrition[];

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: CuisineType,
        default: CuisineType.OTHER,
    })
    cuisine: CuisineType;

    @Column('varchar', { array: true })
    ingredients: string[];

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    imageUrl: string;

}
