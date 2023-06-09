import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'First Test Recipe',
            'First Test recipe description',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('gnocchi', 1),
                new Ingredient('mozarella', 1)
            ]),
        new Recipe(
            'Second Test Recipe',
            'Second Test recipe description',
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
            [
                new Ingredient('zucchini', 5),
                new Ingredient('eggplant', 3),
                new Ingredient('tomato', 4)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();// gonna return a copy of the array
    }

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addToShoppingList(ingredients);
    }
}