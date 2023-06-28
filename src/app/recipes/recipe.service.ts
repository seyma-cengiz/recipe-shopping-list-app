import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipeList : Recipe[])
    {
        this.recipes = recipeList;
        this.recipesChanged.next(this.getRecipes());
    }

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