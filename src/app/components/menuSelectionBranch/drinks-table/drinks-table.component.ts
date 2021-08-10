import { Component, OnInit } from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";
import {DrinksMenu} from "../../../models/drinks-menu";
import {DrinkService} from "../../../services/drink.service";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-drinks-table',
  templateUrl: './drinks-table.component.html',
  styleUrls: ['./drinks-table.component.css']
})
export class DrinksTableComponent implements OnInit {
  public drink: DrinksMenu[] = [];

  constructor(private cookieService: CookieService, private drinkService: DrinkService) {
    drinkService.findAllDrinks("roos@gmail.com").subscribe((data) => {
      this.drink = data;
    })
  }

  ngOnInit(): void {
  }

}
