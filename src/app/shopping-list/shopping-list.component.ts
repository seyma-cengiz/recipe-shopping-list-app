import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  igChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSubscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (updatedIngredients: Ingredient[]) => {
          this.ingredients = updatedIngredients;
        }
      )
  }

  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }

  onSelectToEdit(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
