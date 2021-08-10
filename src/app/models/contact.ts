 enum Service {
  Ingehuurd,
  Leverancier
}

export class Contact {

  // private static _count = 0;
  private _id:  number;
  private _phoneNumber: string; //phone number of the contact
  private _email: string;  //email of the contact
  private _adres: string; //adres of the contact
  private _task : string; //what does this contact do? delivers products? plumber?
  private _name: string; //name of the contact
  private _service: string; //what kind of contact is it? external or a supplier?
  private _username: string;

  private static _oldId = 0;
  private static _contacts: Contact[];


  constructor(
    phoneNumber: string,
    email: string,
    adres: string,
    task: string,
    name: string,
    service: string,
    username: string) {
    this._phoneNumber = phoneNumber;
    this._email = email;
    this._adres = adres;
    this._task = task;
    this._name = name;
    this._service = service;
    this._username = username;
  }

  public setid(value: number) {
    this._id = value;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get adres(): string {
    return this._adres;
  }

  set adres(value: string) {
    this._adres = value;
  }

  get task(): string {
    return this._task;
  }

  set task(value: string) {
    this._task = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get service(): string {
    return this._service;
  }

  set service(value: string) {
    this._service = value;
  }

  static get oldId(): number {
    return this._oldId;
  }

  static set oldId(value: number) {
    this._oldId = value;
  }

  static get contacts(): Contact[] {
    return this._contacts;
  }

  static set contacts(value: Contact[]) {
    this._contacts = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

// todo can be removed once database works

  static createRandomContact() {
    // const naam = 'Contact ' + (Contact._count);
    // const mail = 'contact' + (Contact._count) + '@hva.nl';
    // const nummer = '06' + Math.floor((Math.random() * (99999999 - 10000000)) + 10000000);
    //
    // return new Contact(naam, "Website bouwer" , 'Wibauthuis', mail,  parseInt(nummer), ['Nieuwe website'],
    //   null);
  }

  // private static createRandomId(){
  //   this.oldId += 1;
  //   this._count = this.oldId;
  //   return this.oldId;
  // }
  //
  // static save(contact : Contact){
  //
  // }

  // static delete(contact : Contact){
  //   for (let i = 0; i < this._contacts.length ; i++) {
  //     if(this._contacts[i].id == contact.id){
  //       this._contacts.slice(i,1);
  //
  //     }
  //   }
  // }

  static createContacts(){
    // this.contacts = [];
    // for (let i = 0; i < 8; i++){
    //   this.contacts.push(Contact.createRandomContact());
    // }
    // return this.contacts;
  }

}
