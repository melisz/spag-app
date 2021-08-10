import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Contact} from "../../../models/contact";
import {DishesMenu} from "../../../models/dishes-menu";
import {IngredientService} from "../../../services/ingredient.service";
import {Ingredients} from "../../../models/ingredients";
import {ModalDirective, ModalModule} from "ngx-bootstrap/modal";
import {hide} from "@popperjs/core";

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html',
  styleUrls: ['./new-dish.component.css']
})
export class NewDishComponent implements OnInit, OnChanges{
  @Input() selectedDish: DishesMenu = null;
  @Input() ingredientDutch: String = null;
  @Input() ingredientItalian: String = null;
  @Output() item  = new EventEmitter <DishesMenu>();
  dutchInge: string[] = [];
  italianInge: string[] = [];
  ingredients: Ingredients[] = [];
  newDish: DishesMenu;
  i: Ingredients;
  ing: DishesMenu = null;
  dishes: DishesMenu;
  list: Ingredients[];
  categorie:string = null;
  name: string = null;
  dutch: string =  null;
  italian: string =  null;

  constructor(private service: IngredientService) {
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.ing = this.selectedDish as DishesMenu;
    if(this.ing != null) {
      this.name = this.ing.name
      this.categorie = this.ing.categorie
    }
  }


  saveDish(id: number,name: string, categorie:string, dutch: string, italian: string){
    if(name == null || categorie == null || dutch == null  || italian == null){
      alert("U moet voor een gerecht alle velden invullen.");
    } else if(dutch == null  && italian == null && categorie == "Selecteer een categorie:"){
      alert("U moet voor een gerecht alle ingredienten in beide talen invullen. En u moet een categorie toevoegen aan het gerecht.");
    } else if (categorie == "Selecteer een categorie:"){
      alert("U moet een categorie toevoegen aan het gerecht");
    }else if (dutch == null  || italian == null){
      alert("U moet voor een gerecht alle ingredienten in beide talen invullen.");
    } else{
      this.dutchInge = [];
      this.italianInge = [];
      this.ingredients = [];
      this.newDish = null;

     document.getElementById("close").click();
      this.dutchInge = dutch.split(',');
      this.italianInge = italian.split(',');
      for (let i = 0; i < this.dutchInge.length; i++) {
        this.i = new Ingredients(this.dutchInge[i],this.italianInge[i]);
        this.i.id = 0;
        this.ingredients[i] = this.i;
      }
      this.newDish = new DishesMenu(name,categorie,this.ingredients);
      if(id == null){
        this.newDish.id = 0;
      }else{
        this.newDish.id = id;
      }
      this.item.emit(this.newDish);
      this.rest();
    }
  }

  rest(){
    this.categorie =  null;
    this.name = null;
    this.dutch = "";
    this.italian = "";
    this.selectedDish = null;
  }
}
