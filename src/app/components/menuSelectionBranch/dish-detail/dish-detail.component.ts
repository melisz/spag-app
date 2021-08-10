import { Component, OnInit } from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  public   _ingredientDutch: string[] = [];
  public  _ingredientItalian: string[] = [];
  public  dishes: DishesMenu[]= [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
