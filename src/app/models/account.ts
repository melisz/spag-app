export class Account {
  private _username: string;
  private _password: string;
  private _phoneNumber: string;
  private _name: string;
  private _location: string;
  private _admin: boolean;
  private _active: boolean;

  constructor(username: string, password: string, phoneNumber: string, name: string, location: string) {
    this._username = username;
    this._password = password;
    this._phoneNumber = phoneNumber;
    this._name = name;
    this._location = location;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
}
