import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Dish} from "./Dish";

@Entity()
export class Nutrition {

    constructor(name: string, value: number, unit: string) {
        this.name = name;
        this.value = value;
        this.unit = unit;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /*
     * ManyToOne bidirectional relationship between Nutrition and Dish
     * On delete cascade on foreign key dishId
     * Nutrition is the owning side of this association, contains column dishId
     * */
    @ManyToOne(() => Dish, (dish) => dish.nutritions, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    dish: Dish

    @Column()
    name: string;

    @Column()
    value: number

    @Column()
    unit: string
}