import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {DrinksMenu} from "../../../models/drinks-menu";

@Component({
  selector: 'app-drinks-tm-detail',
  templateUrl: './drinks-tm-detail.component.html',
  styleUrls: ['./drinks-tm-detail.component.css']
})
export class DrinksTmDetailComponent implements OnInit {
  @Output() saveNewDrinkInParent = new EventEmitter <DrinksMenu>();
  public  dishes: DishesMenu[]= [];
  values = '';
  drink: DrinksMenu;

  constructor() {
  }

  ngOnInit(): void {
  }

  saveNewDrink(value: string) {
    this.drink = new DrinksMenu(value);
    this.drink.name = value;
    this.drink.idDrink = 0;
    this.saveNewDrinkInParent.emit(this.drink);
  }


}
