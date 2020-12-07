import {User} from "../entity/User";
import {Role} from "../enum/Role";
import {Dish} from "../entity/Dish";
import {Recipe} from "../entity/Recipe";
import {CuisineType} from "../enum/CuisineType";
import {Nutrition} from "../entity/Nutrition";

const user1 = new User("ericrkuo@gmail.com", "Eric Kuo", "https://avatars1.githubusercontent.com/u/49849754?s=460&u=f053a589aeb7706a6f9630833f33a5688d0494ba&v=4", 100, Role.FRIEND);
const user2 = new User("lilyyduu@gmail.com", "Lily Du", "https://avatars0.githubusercontent.com/u/54044854?s=460&u=6420652b7e93a5e0209c12a177202a9574c5ac90&v=4", 200, Role.FRIEND);
const user3 = new User("andrewzulaybar@gmail.com", "Andrew Zulaybar", "https://avatars3.githubusercontent.com/u/44531733?s=460&u=6dbe15590ee8e9da47e4c201d80b4b1340a6c72a&v=4", 300, Role.FRIEND);
const user4 = new User("superuser@gmail.com", "superuser", "", 0, Role.SUPER_USER);

// todo: make these by calling spoonacular API on the dishes provided
const recipe1 = new Recipe("123", "Chirashi Sushi Cake and Temari Sushi", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe2 = new Recipe("123", "Deconstructed Sushi (Chirashi Sushi)", "http://www.thevintagemixer.com/2012/04/deconstructed-sushi-bowl-recipe/");
const recipe3 = new Recipe("123", "Make your own Korean BBQ skewers", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe4 = new Recipe("123", "Korean BBQ", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe5 = new Recipe("123", "Grandma's Schnitzels", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe6 = new Recipe("123", "German Authnetic Schnitzels", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe7 = new Recipe("123", "Amygdalota at Home", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe8 = new Recipe("123", "Best Amygdalota across Greek", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe9 = new Recipe("123", "PiriPiri home made style", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe10 = new Recipe("123", "Best PiriPiri", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe11 = new Recipe("123", "NY Style - Chef Augistine's Take", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");
const recipe12 = new Recipe("123", "How to make the best cheese pizza", "http://www.justonecookbook.com/recipes/chirashi-sushi-cake-and-temari-sushi-and-giveaway-winners/");

// todo: make these by calling spoonacular API on the dishes provided
const nutrition1 = new Nutrition("Calories", 300, "calories");
const nutrition2 = new Nutrition("Fat", 5, "%");
const nutrition3 = new Nutrition("Sugar", 25, "g");
const nutrition4 = new Nutrition("Carbs", 100, "g");
const nutrition5 = new Nutrition("Protein", 100, "g");
const nutrition6 = new Nutrition("Sugar", 10, "g");
const nutrition7 = new Nutrition("Calories", 500, "calories");
const nutrition8 = new Nutrition("Carbs", 100, "g");
const nutrition9 = new Nutrition("Protein", 10, "g");
const nutrition10 = new Nutrition("Salt", 100, "mg");
const nutrition11 = new Nutrition("Saturated Fat", 15, "%");
const nutrition12 = new Nutrition("Protein", 20, "g");


const dish1 = new Dish(user1, [recipe1, recipe2], [nutrition1, nutrition2], "Giant Sushi", "I love sushi and this was my first time making it", CuisineType.JAPANESE, ["rice", "salmon", "cucumber", "seaweed"], "test", "test", "https://user-images.githubusercontent.com/49849754/101288415-4a467980-37ab-11eb-8a3a-ae40e73d2e6d.png");
const dish2 = new Dish(user1, [recipe3, recipe4], [nutrition3, nutrition4], "Delicious Korean BBQ", "Yum, next step is to create my own restaurant!", CuisineType.KOREAN, ["meat", "korean bbq sauce"], "", "", "https://user-images.githubusercontent.com/49849754/101288450-7feb6280-37ab-11eb-9292-28fe8478c355.png");
const dish3 = new Dish(user2, [recipe5, recipe6], [nutrition5, nutrition6], "Schnitzel", "I did not know what a Schnitzel was, but its delicious!", CuisineType.GERMAN, ["mushroom", "peppers", "pork"], "", "", "https://user-images.githubusercontent.com/49849754/101288717-e45af180-37ac-11eb-9429-5362091bef0c.png");
const dish4 = new Dish(user2, [recipe7, recipe8], [nutrition7, nutrition8], "Amygdalota", "I really love trying new foods, check this out!", CuisineType.GREEK, ["almonds", "flour", "sugar", "egg whites", "almond extract"], "", "", "https://user-images.githubusercontent.com/49849754/101288852-a3171180-37ad-11eb-9634-44e86760e424.png");
const dish5 = new Dish(user3, [recipe9, recipe10], [nutrition9, nutrition10], "Piri piri chicken", "OMG this was so good, this was one of my friends grandmothers secret recipe", CuisineType.AFRICAN, ["chicken", "coconut", "cashews", "peanuts"], "", "", "https://user-images.githubusercontent.com/49849754/101288833-7e229e80-37ad-11eb-839f-b96b68f909f9.png");
const dish6 = new Dish(user3, [recipe11, recipe12], [nutrition11, nutrition12], "My take on NY Style Pizza", "Not as good as the real thing, but still delicious!", CuisineType.AMERICAN, ["flour", "cheese", "tomato sauce"], "", "", "https://user-images.githubusercontent.com/49849754/101288872-be821c80-37ad-11eb-94b5-9c3522b849e7.png");

export const users_sample = [user1, user2, user3, user4];
export const dishes_sample = [dish1, dish2, dish3, dish4, dish5, dish6];

