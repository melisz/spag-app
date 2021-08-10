export class Ingredients {
  private _id : number;
  // private ingredientNl: string;
  // private ingredientIt: string;

  private _nameNL: string;
  private _nameIT: string;

  constructor(ingredientNl: string, ingredientIt: string){
    this._nameNL = ingredientNl;
    this._nameIT = ingredientIt;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

// get getid(): number {
  //   return this._id_ingredient;
  // }
  //
  // get id_ingredient(): number {
  //   return this._id_ingredient;
  // }
  //
  // set id_ingredient(value: number) {
  //   this._id_ingredient = value;
  // }
  //
  // set setid(value: number) {
  //   this._id_ingredient = value;
  // }


  get nameNL(): string {
    return this._nameNL;
  }

  set nameNL(value: string) {
    this._nameNL = value;
  }

  get nameIT(): string {
    return this._nameIT;
  }

  set nameIT(value: string) {
    this._nameIT = value;
  }


}
