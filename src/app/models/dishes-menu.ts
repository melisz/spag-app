import {Ingredients} from "./ingredients";

export class DishesMenu {
  private _id: number;
  private _name: string;
  private _categorie: string;
  private _ingredients: Ingredients[];
  private _username: string;


  constructor(name: string,categorie: string, ingredients: Ingredients[] ){
    this._name = name;
    this._categorie = categorie;
    this._ingredients = ingredients;
}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get categorie(): string {
    return this._categorie;
  }

  set categorie(value: string) {
    this._categorie = value;
  }

  get ingredients(): Ingredients[] {
    return this._ingredients;
  }

  set ingredients(value: Ingredients[]) {
    this._ingredients = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
