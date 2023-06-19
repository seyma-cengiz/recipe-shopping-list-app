import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm : FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm()
  {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients)
      {
        for(let ingredient of recipe.ingredients)
        {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required,
                 Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'recipeName' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(imagePath, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'ingredients' : ingredients
    });
    
  }

  get ingredientControls ()
  {
    return  (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient()
  {
    this.ingredientControls.push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,
        [Validators.required,
         Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }
  
  onSubmit(){
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value['recipeName'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    debugger;
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else
    {
      newRecipe.id=Math.random()*100
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
