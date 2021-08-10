import { Component, OnInit } from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {ContactService} from "../../../services/contact.service";
import {IngredientService} from "../../../services/ingredient.service";
import {Ingredients} from "../../../models/ingredients";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.css']
})
export class IngredientsTableComponent implements OnInit {
  private itemClicked: string;
  public status : boolean = false;
  public  dishes: DishesMenu[]= [];
  private newDish: DishesMenu;

  public   _ingredientDutch: string[] = [];
  public  _ingredientItalian: string[] = [];
  list: Ingredients[];
   ingredients: Ingredients;
  private i : number = 0;

  constructor(private cookieService : CookieService, private service: IngredientService) {
  }

  ngOnInit(): void {
    //get size data
    //loop door data heen
    //voer nl aan nl array en it aan it array
    this.service.findAllingredients("roos@gmail.com").subscribe((data)  =>
    {
      this.list = data;
      for (let i = 0; i < this.list.length; i++) {
        this.ingredients = data[i];
      }
      return this.list;
    });
  }
}
