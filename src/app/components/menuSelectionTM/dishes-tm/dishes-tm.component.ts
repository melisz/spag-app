import {Component, Input, OnInit} from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {DrinksMenu} from "../../../models/drinks-menu";
import {DishService} from "../../../services/dish.service";
import {DrinkService} from "../../../services/drink.service";
import {MenuService} from "../../../services/menu.service";
import {Menu} from "../../../models/menu";
import {MenuDishServiceService} from "../../../services/menu-dish-service.service";
import {MenuDish} from "../../../models/menu-dish";
import {IngredientService} from "../../../services/ingredient.service";
import {DishIngredientService} from "../../../services/dish-ingredient.service";
import {DishIngredient} from "../../../models/dish-ingredient";
import {Ingredients} from "../../../models/ingredients";
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'app-dishes-tm',
  templateUrl: './dishes-tm.component.html',
  styleUrls: ['./dishes-tm.component.css']
})
export class DishesTMComponent implements OnInit {
  public show: string;
  public itemClicked: DishesMenu;
  public dishes: DishesMenu[] = [];
  public menu: DishesMenu[] = [];
  public id: number;
  public drink: DrinksMenu[] = [];
  public status: boolean = false;
  public ingredientDutch: string[] = [];
  public ingredientItalian: string[] = [];
  currentItem: DrinksMenu;
  clickedDish: DishesMenu; //was eerst null
  editDrink: DrinksMenu = null;
  add: DishesMenu = null;
  menuItems: MenuDish[];
  ingredientId: Array<number> = [];
  idIngredient: Ingredients;
  ingredientsForDish: Array<number>= [];
  dishId: number;
  one: number;
  i: DishIngredient;
  list: Ingredients[];

  constructor(private cookieService: CookieService, private dishIngredientService:  DishIngredientService, private menuService: MenuService, private dishService: DishService, private drinkService: DrinkService, private ingredientService: IngredientService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.dishService.findAllDishes("roos@gmail.com").subscribe((data) =>
      this.dishes = data
    );
    this.drinkService.findAllDrinks("roos@gmail.com").subscribe((data) =>
      this.drink = data
    );

  }

  showDetail(name: DishesMenu) {
    this.clickedDish = name;
    this.ingredientItalian = [];
    this.ingredientDutch = [];
    if(name != null) {
      this.ingredientService.findAllingredientsByDish(this.clickedDish.id).subscribe((data) => {
        this.list = data;

        this.ingredientItalian = [];
        this.ingredientDutch = [];
        for (let i = 0; i < this.list.length; i++) {
          this.ingredientDutch[i] = this.list[i].nameNL;
          this.ingredientItalian[i] = this.list[i].nameIT;
        }
        this.ingredientItalian.join(',');
        this.ingredientDutch.join(',');

      });
    } else {
      this.ingredientItalian = [];
      this.ingredientDutch = [];
    }
  }


  updateDrinks(item: DrinksMenu) {
    this.editDrink = item;
  }

  deleteDrinksFromMenu(item: DrinksMenu) {
    if (confirm("Weet u zeker dat u deze drank wil verwijderen?")) {
      this.drinkService.deleteDrink(item.idDrink).subscribe(((data) => {
        for (let i = 0; i < this.drink.length; i++) {
          if (this.drink[i].idDrink == item.idDrink) {
            this.drink.splice(i, 1);
          }
        }
      }));
    }
  }

  deleteDishFromMenu(newDish: DishesMenu) {
    if (confirm("Weet u zeker dat u dit gerecht wil verwijderen?")) {
      this.dishService.deletePost(newDish.id).subscribe(((data) => {
        this.ngOnInit();
      }));
    }
  }

    addIngredients(ingredients: Ingredients[]): number[]{
    this.ingredientId = [];
      for (let i = 0; i < ingredients.length; i++) {
        this.ingredientService.saveIngredient(ingredients[i].id, ingredients[i]).subscribe((data) => {
          this.idIngredient = data as Ingredients;
          this.ingredientId.push(this.idIngredient.id);
        })
      }
      return this.ingredientId;
    }

  addDish(newDish: DishesMenu){
    this.ingredientsForDish = [];
    this.dishId = 0;
    this.ingredientsForDish = this.addIngredients(newDish.ingredients);
    if (newDish.id == 0) {
      newDish.username = "roos@gmail.com";
      this.dishService.saveDish(0, newDish).subscribe(((data) => {
        this.dishId = data as number;
        this.addDishToIngredient();
        this.ngOnInit();
      }));
    } else {
      newDish.id = this.clickedDish.id
      newDish.username = this.clickedDish.username;
      this.dishService.saveDish(newDish.id, newDish).subscribe(((data) => {
        this.dishId = newDish.id;
          this.addDishToIngredient();
        this.ngOnInit();
      }));
    }

  }

  addDishToIngredient(){
    for (let j = 0; j < this.ingredientsForDish.length; j++) {
      const i = new DishIngredient(this.dishId, this.ingredientsForDish[j])
      this.dishIngredientService.saveDishIngredient(i).subscribe((data) => {
      });
    }
  }






  addDrink(newDrink: DrinksMenu) {
    if(newDrink.idDrink == 0 || newDrink.idDrink == null){
      newDrink.username = "roos@gmail.com";
      this.drinkService.saveDrink(0, newDrink).subscribe(((data) => {
        this.ngOnInit();
      }));
    }else{
      newDrink.idDrink = this.editDrink.idDrink
      newDrink.username = this.editDrink.username;
      this.drinkService.saveDrink(newDrink.idDrink, newDrink).subscribe(((data) => {
        for(let i = 0; i < this.drink.length; i++){
          if(this.editDrink.idDrink == this.drink[i].idDrink){
            this.drink[i] = newDrink;
          }
        }
      }));
    }
  }

}

