import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './app.header.html',
    styleUrls: ['./app.header.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
    isAuthenticated:boolean;
    private userSubscription: Subscription;

    constructor(private recipeService: RecipeService,
        private dataStorageService: DataStorageService,
        private authService: AuthService) {
    }

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = user!=null;
        });
    }

    onSaveData() {
        const recipes = this.recipeService.getRecipes();
        this.dataStorageService.storeData(recipes);
    }

    onFetchData() {
        this.dataStorageService.fetchData().subscribe();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}