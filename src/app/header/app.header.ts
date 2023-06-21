import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './app.header.html',
    styleUrls: ['./app.header.css']
})
export class HeaderComponent {

    constructor(private recipeService: RecipeService,
        private dataStorageService: DataStorageService) {

    }

    onSaveData() {
        const recipes = this.recipeService.getRecipes();
        this.dataStorageService.storeData(recipes);
    }

    onFetchData() {
        this.dataStorageService.fetchData().subscribe();
    }
}