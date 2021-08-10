import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";

@Component({
  selector: 'app-generate-menu',
  templateUrl: './generate-menu.component.html',
  styleUrls: ['./generate-menu.component.css']
})
export class GenerateMenuComponent implements OnInit {
  //get all the selected dish values from menu-selection.component.html
  @Input() dishSeven: DishesMenu = null;
  @Input() dishSix: DishesMenu = null;
  @Input() dishFive: DishesMenu = null;
  @Input() dishFour: DishesMenu = null;
  @Input() dishThree: DishesMenu = null;
  @Input() dishOne: DishesMenu = null;
  @Input() dishTwo: DishesMenu = null;
  //get a list of all the ingredients from menu-selection.component.html
  @Input() ingredientsList: string[];

  constructor() { }

  ngOnInit(): void {

  }
}
