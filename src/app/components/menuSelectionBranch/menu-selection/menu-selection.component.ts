import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {MenuService} from "../../../services/menu.service";
import {DishesMenu} from "../../../models/dishes-menu";
import {DishService} from "../../../services/dish.service";
import * as XLSX from 'xlsx';
import {IngredientService} from "../../../services/ingredient.service";
import {Ingredients} from "../../../models/ingredients";
import {AppComponent} from "../../../app.component";
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'app-menu-selection',
  templateUrl: './menu-selection.component.html',
  styleUrls: ['./menu-selection.component.css']
})
export class MenuSelectionComponent implements OnInit, AfterViewInit {
  //save all dishes from back end
  dishes: DishesMenu[];
  //save all dishes with categorie speciaal
  speciale: DishesMenu[] = [];
  //save all dishes with categorie vegetarisch
  vegan: DishesMenu[] = [];
  //save all dishes with categorie vlees
  meat: DishesMenu[] = [];
  //save all dishes with categorie vis
  fish: DishesMenu[] = [];
  //ngModel values for all the dishes that can be selected
  dishSeven: DishesMenu = null;
  dishSix: DishesMenu = null;
  dishFive: DishesMenu = null;
  dishFour: DishesMenu = null;
  dishThree: DishesMenu = null;
  dishTwo: DishesMenu = null;
  dishOne: DishesMenu = null;
  //name of excel document
  fileName = 'Menu-van-vandaag.xlsx';
  //array's used to save the ingredient names in dutch and italian
  public ingredientDutch: string[] = [];
  public ingredientItalian: string[] = [];
  //array used to save all the ingredients of a dish
  list: Ingredients[] = [];
  //list of ingredients from all the selected dishes
  ingredientsList: string[] = [];



  constructor(private cookieService: CookieService,private menuSerivce: MenuService, private dishService: DishService, private ingredients: IngredientService) {
    //get all the dishes from the backend
    this.dishService.findAllDishes("roos@gmail.com").subscribe((data) => {
      this.dishes = data as DishesMenu[];
      //add all the dishes to the right array by filtering them on categorie
      for (let i = 0; i < this.dishes.length; i++) {
        if (this.dishes[i].categorie == "Vegetarisch") {
          this.vegan.push(this.dishes[i]);
        } else if (this.dishes[i].categorie == "Vlees") {
          this.meat.push(this.dishes[i]);
        } else if (this.dishes[i].categorie == "Vis") {
          this.fish.push(this.dishes[i]);
        } else if (this.dishes[i].categorie == "Speciaal") {
          this.speciale.push(this.dishes[i]);
        }
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  /**
   * Save a menu to the back end and download the menu
   * @param dishOne : first selected dish
   * @param dishTwo : second selected dish
   * @param dishThree : third selected dish
   * @param dishFour : fourth selected dish
   * @param dishFive : fifth selected dish
   * @param dishSix :  sixth selected dish
   * @param dishSeven : seventh selected dish
   */
  saveTheMenu(dishOne: DishesMenu, dishTwo: DishesMenu, dishThree: DishesMenu, dishFour: DishesMenu, dishFive: DishesMenu, dishSix: DishesMenu, dishSeven: DishesMenu) {
    if(dishOne == null || dishTwo == null ||dishThree == null||dishFour == null||dishFive == null||dishSix == null||dishSeven == null){
      alert("U moet alle gerechten kiezen voordat u het menu kan opslaan")
    }else if (confirm("Weet u zeker dat u dit menu wil opslaan? \nUw gekozen menu zal meteen gedownload worden.")) {
      //save menu in database
      this.menuSerivce.saveMenu(0, [dishOne,dishTwo,dishThree, dishFour, dishFive, dishSix, dishSeven]).subscribe();
      //export the menu with all the dishes and ingredients on it
      this.exportexcel()
      this.ingredientsList = [];
    }
    this.rest();
  }

  /**
   * save all the ingredients of the selected dish to the list of total ingredients
   * @param dish : a selected dish of which the ingredients are not yet saved
   * return list of ingredients for all the selected dishes
   */
  genereteIngredientsNl(dish: DishesMenu) {
    //check if dish exists
    if (dish.name != null) {
      //find all ingredients for this dish
      this.ingredients.findAllingredientsByDish(dish.id).subscribe((data) => {
        this.list = data;
        this.ingredientItalian = [];
        this.ingredientDutch = [];
        //loop through the list of ingredients and save the dutch and italian names in different array's
        for (let i = 0; i < this.list.length; i++) {
          this.ingredientDutch[i] = this.list[i].nameNL;
          this.ingredientItalian[i] = this.list[i].nameIT;
        }
        //push the ingredients to the primary list -> in a lay out like this -> tomaat,ui,biet
        this.ingredientsList.push(this.ingredientDutch.join(','), this.ingredientItalian.join(','));

        return this.ingredientsList
      });
    } else {
      this.ingredientItalian = [];
      this.ingredientDutch = [];
      return this.ingredientsList = [];
    }
  }

  /**
   * rest all values on html page
   */
  rest() {
    //rest all ngModels and ingredientslist
    this.dishOne = null;
    this.dishTwo = null;
    this.dishThree = null;
    this.dishFour = null;
    this.dishFive = null;
    this.dishSix = null;
    this.dishSeven = null;
    this.ingredientsList = [];
  }

  /**
   * export excel document with all the menu values on it
   */
  exportexcel(): void {
    //get table
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Menu');

    //save to file
    XLSX.writeFile(wb, this.fileName);
  }
}
