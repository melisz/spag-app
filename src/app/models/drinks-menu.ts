export class DrinksMenu {

  private _name: string;
  private _idDrink: number;
  private _username: string;
  private static _count = 0;

  constructor(name: string){
    this._name = name;
  }


 get idDrink(): number {
    return this._idDrink;
  }

  set idDrink(value: number) {
    this._idDrink = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  public setid(value: number) {
    this._idDrink = value;
  }
}
