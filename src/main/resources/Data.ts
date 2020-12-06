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
const recipe1 = new Recipe("123", "test", "test");
const recipe2 = new Recipe("123", "test", "test");
const recipe3 = new Recipe("123", "test", "test");
const recipe4 = new Recipe("123", "test", "test");
const recipe5 = new Recipe("123", "test", "test");
const recipe6 = new Recipe("123", "test", "test");
const recipe7 = new Recipe("123", "test", "test");
const recipe8 = new Recipe("123", "test", "test");
const recipe9 = new Recipe("123", "test", "test");
const recipe10 = new Recipe("123", "test", "test");
const recipe11 = new Recipe("123", "test", "test");
const recipe12 = new Recipe("123", "test", "test");

// todo: make these by calling spoonacular API on the dishes provided
const nutrition1 = new Nutrition("", 0, "");
const nutrition2 = new Nutrition("", 0, "");
const nutrition3 = new Nutrition("", 0, "");
const nutrition4 = new Nutrition("", 0, "");
const nutrition5 = new Nutrition("", 0, "");
const nutrition6 = new Nutrition("", 0, "");
const nutrition7 = new Nutrition("", 0, "");
const nutrition8 = new Nutrition("", 0, "");
const nutrition9 = new Nutrition("", 0, "");
const nutrition10 = new Nutrition("", 0, "");
const nutrition11 = new Nutrition("", 0, "");
const nutrition12 = new Nutrition("", 0, "");


const dish1 = new Dish(user1, [recipe1, recipe2], [nutrition1, nutrition2], "Giant Sushi", "I love sushi and this was my first time making it", CuisineType.JAPANESE, ["rice", "salmon", "cucumber", "seaweed"], "test", "test", "https://user-images.githubusercontent.com/49849754/101288415-4a467980-37ab-11eb-8a3a-ae40e73d2e6d.png");
const dish2 = new Dish(user1, [recipe3, recipe4], [nutrition3, nutrition4], "Delicious Korean BBQ", "Yum, next step is to create my own restaurant!", CuisineType.KOREAN, ["meat", "korean bbq sauce"], "", "", "https://user-images.githubusercontent.com/49849754/101288450-7feb6280-37ab-11eb-9292-28fe8478c355.png");
const dish3 = new Dish(user2, [recipe5, recipe6], [nutrition5, nutrition6], "Schnitzel", "I did not know what a Schnitzel was, but its delicious!", CuisineType.GERMAN, ["mushroom", "peppers", "pork"], "", "", "https://user-images.githubusercontent.com/49849754/101288717-e45af180-37ac-11eb-9429-5362091bef0c.png");
const dish4 = new Dish(user2, [recipe7, recipe8], [nutrition7, nutrition8], "Amygdalota", "I really love trying new foods, check this out!", CuisineType.GREEK, ["almonds", "flour", "sugar", "egg whites", "almond extract"], "", "", "https://user-images.githubusercontent.com/49849754/101288852-a3171180-37ad-11eb-9634-44e86760e424.png");
const dish5 = new Dish(user3, [recipe9, recipe10], [nutrition9, nutrition10], "Piri piri chicken", "OMG this was so good, this was one of my friends grandmothers secret recipe", CuisineType.AFRICAN, ["chicken", "coconut", "cashews", "peanuts"], "", "", "https://user-images.githubusercontent.com/49849754/101288833-7e229e80-37ad-11eb-839f-b96b68f909f9.png");
const dish6 = new Dish(user3, [recipe11, recipe12], [nutrition11, nutrition12], "My take on NY Style Pizza", "Not as good as the real thing, but still delicious!", CuisineType.AMERICAN, ["flour", "cheese", "tomato sauce"], "", "", "https://user-images.githubusercontent.com/49849754/101288872-be821c80-37ad-11eb-94b5-9c3522b849e7.png");

export const users_sample = [user1, user2, user3, user4];
export const dishes_sample = [dish1, dish2, dish3, dish4, dish5, dish6];

