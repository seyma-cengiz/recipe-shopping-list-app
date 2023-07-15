import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeData(recipes: Recipe[]) {
        this.http.put('firebase_api_url.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchData() {
        return this.authService.user.pipe(take(1),
        exhaustMap(user=>{
            return this.http.get<Recipe[]>('firebase_api_url.json',
            {
                params: new HttpParams().set('auth',user.token)
            });
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}