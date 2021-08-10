export class DishIngredient {
  private _id_dish: number;
  private _id_ingredient: number;


  constructor(id_dish: number, id_ingredient: number) {
    this._id_dish = id_dish;
    this._id_ingredient = id_ingredient;
  }


  get id_dish(): number {
    return this._id_dish;
  }

  set id_dish(value: number) {
    this._id_dish = value;
  }

  get id_ingredient(): number {
    return this._id_ingredient;
  }

  set id_ingredient(value: number) {
    this._id_ingredient = value;
  }
}
