import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {user} from "../models/message/user";
import {message} from "../models/message/message";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  readonly API_NAME: string = environment.API_URL;


  constructor(private httpClient: HttpClient) {
  }

  getAllContacts(username: String){
    let body: any = {
      "username": username,
    }

    return this.httpClient.post(this.API_NAME + "Message/contact", body)

  }

  setAllonRead(selectedUser: String, username: string){

    let body: any = {
      "sender": selectedUser,
      "reciever": username
    }


    return this.httpClient.put(this.API_NAME + "Message/read", body)

  }

  sendMessage(message: message){
    return this.httpClient.post(this.API_NAME + "Message/send", message)
  }

  getMessages(user1: String, user2:String){
    let body: any = {
      "user1": user1,
      "user2": user2
    }

    return this.httpClient.post(this.API_NAME + "Message/messages", body)
  }

  getPinnedMessages(user1: String, user2:String){
    let body: any = {
      "user1": user1,
      "user2": user2
    }

    return this.httpClient.post(this.API_NAME + "Message/messages/pinned", body)
  }
}
