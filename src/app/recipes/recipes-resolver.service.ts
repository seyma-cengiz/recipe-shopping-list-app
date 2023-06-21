import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

export const RecipesResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
        const dataStorageService = inject(DataStorageService);
        const recipeService = inject(RecipeService);

        const recipes = recipeService.getRecipes();
        if (recipes.length == 0)
            return dataStorageService.fetchData();
        else
            return recipes;
    }