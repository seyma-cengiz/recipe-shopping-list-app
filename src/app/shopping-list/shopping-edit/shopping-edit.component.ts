import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  selectedIngredient: Ingredient;
  editMode = false;
  editIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editIndex = index;
          
          this.selectedIngredient = this.shoppingListService.getIngredient(index);
          this.ingredientForm.setValue({
            name: this.selectedIngredient.name,
            amount: this.selectedIngredient.amount
          });
        });
  }

  onSubmit() {
    const value = this.ingredientForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode)
      this.shoppingListService.updateIngredient(this.editIndex, ingredient);
    else
      this.shoppingListService.addIngredient(ingredient);

    this.clearForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.clearForm();
  }

  onClear() {
    this.clearForm();
  }

  clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}