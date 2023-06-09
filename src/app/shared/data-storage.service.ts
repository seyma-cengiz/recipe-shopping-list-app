import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }

    storeData(recipes: Recipe[]) {
        this.http.put('firebase_api_url.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchData() {
        return this.http.get<Recipe[]>('firebase_api_url.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}