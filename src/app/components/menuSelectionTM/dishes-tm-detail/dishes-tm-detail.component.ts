import {Component, Input, OnInit} from '@angular/core';
import {DishesMenu} from "../../../models/dishes-menu";

@Component({
  selector: 'app-dishes-tm-detail',
  templateUrl: './dishes-tm-detail.component.html',
  styleUrls: ['./dishes-tm-detail.component.css']
})
export class DishesTmDetailComponent implements OnInit {
  @Input() dish: DishesMenu;
  public  showDish: DishesMenu;


  constructor() {
  }

  ngOnInit(): void {
  }
}
