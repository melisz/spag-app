import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {DrinksMenu} from "../../../models/drinks-menu";

@Component({
  selector: 'app-drinks-tm',
  templateUrl: './drinks-tm.component.html',
  styleUrls: ['./drinks-tm.component.css']
})
export class DrinksTmComponent implements OnInit {
  @Input() aDrink: DrinksMenu;
  @Output() saveNewDrink = new EventEmitter <DrinksMenu>();
  drink: DrinksMenu = null;

  constructor() {
  }

  ngOnInit(): void {

  }

  saveNewDrinks(id: number,drinkName: string) {
    this.drink = null;
    this.drink = new DrinksMenu(drinkName);
    this.drink.name = drinkName;
    this.drink.idDrink = id;
    this.saveNewDrink.emit(this.drink);
  }
}
