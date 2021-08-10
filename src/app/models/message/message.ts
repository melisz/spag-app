import {user} from "./user";

export class message{

  public idmessage: number
  public datetimesend: Date;
  public message: String;
  public isread: boolean;
  public sender: String;
  public reciever: String;
  public pinned: boolean

  constructor(idmessage?: number, datetimesend?: Date, message?: String, isread?: boolean, sender?: String, reciever?: String, pinned?: boolean) {
    this.idmessage = idmessage;
    this.datetimesend = datetimesend;
    this.message = message;
    this.isread = isread;
    this.sender = sender;
    this.reciever = reciever;
    this.pinned = pinned;
  }
}
