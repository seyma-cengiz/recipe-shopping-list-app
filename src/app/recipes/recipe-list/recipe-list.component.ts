import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('First Test Recipe', 'First Test recipe description', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    new Recipe('Second Test Recipe', 'Second Test recipe description', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg')
  ];

  @Output() recipeSelectedOnList = new EventEmitter<Recipe>();

  onRecipeSelected(recipe) {
    this.recipeSelectedOnList.emit(recipe);
  }



}
