import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            1,
            'Mozarella Gnocchi Recipe',
            'Mozarella gnocchi recipe details',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('gnocchi', 1),
                new Ingredient('mozarella', 1)
            ]),
        new Recipe(
            2,
            'Ratatouille Recipe',
            'Ratatouille recipe details',
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
            [
                new Ingredient('zucchini', 5),
                new Ingredient('eggplant', 3),
                new Ingredient('tomato', 4)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipe(id: number): Recipe {
        return this.recipes.find(t => t.id == id);
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();// gonna return a copy of the array
    }

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addToShoppingList(ingredients);
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(id: number, newRecipe: Recipe){
        let recipeIndex = this.recipes.findIndex(t=>t.id == id);
        this.recipes[recipeIndex]=newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(id:number){
        let recipeIndex = this.recipes.findIndex(t=>t.id == id);
        this.recipes.splice(recipeIndex,1);
        this.recipesChanged.next(this.getRecipes());
    }
}