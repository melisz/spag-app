export class MenuDish {
  private _id_menu: number;
  private _id_dish : number;

  constructor(id_menu: number, id_dish: number) {
    this._id_menu = id_menu;
    this._id_dish = id_dish;
  }

  get id_menu(): number {
    return this._id_menu;
  }

  set id_menu(value: number) {
    this._id_menu = value;
  }

  get id_dish(): number {
    return this._id_dish;
  }

  set id_dish(value: number) {
    this._id_dish = value;
  }
}
