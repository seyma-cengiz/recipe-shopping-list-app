import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.addIngredientOrIncreaseAmount(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addToShoppingList(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => {
            this.addIngredientOrIncreaseAmount(ingredient);
        });
        this.ingredientsChanged.next(this.getIngredients());
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

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.getIngredients());
    }
}