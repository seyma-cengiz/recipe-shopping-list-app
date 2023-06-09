import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.addIngredientOrIncreaseAmount(ingredient);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addToShoppingList(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => {
            this.addIngredientOrIncreaseAmount(ingredient);
        });
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredientOrIncreaseAmount(ingredient) {
        var idx = this.ingredients.findIndex(t => t.name == ingredient.name);
        if (idx > -1) {
            this.ingredients[idx].amount += parseInt(ingredient.amount);
        }
        else {
            this.ingredients.push(ingredient);
        }
    }
}