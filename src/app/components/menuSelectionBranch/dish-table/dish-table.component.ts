import { Component, OnInit } from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-dish-table',
  templateUrl: './dish-table.component.html',
  styleUrls: ['./dish-table.component.css']
})
export class DishTableComponent implements OnInit {
  private itemClicked: string;
  public status : boolean = false;
  public  dishes: DishesMenu[]= [];
  public menu: DishesMenu[] = [];
  public menuCopy: DishesMenu[] = [];
  public fullMenu: Array<DishesMenu[]> = [];
  public id: number;

  public addToMenu: DishesMenu;
  private newDish: DishesMenu;

  private  _ingredientDutch: string[] = [];
  private  _ingredientItalian: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  showDetail(name: string){
    this.itemClicked = name;
    this.status = true;

  }

  addNewDishToMenu(item: DishesMenu): DishesMenu {
    this.addToMenu = item;
    this.menu.push(this.addToMenu);
    return this.addToMenu;
  }


  deleteDishFromMenu(item: DishesMenu) {
    for(let i = 0; i < this.menu.length; i++){
    if(item == this.menu[i]){
        this.menu.splice(i,1);
    }
  }
}}
