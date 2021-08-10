import {Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {user} from "../../models/message/user";
import {message} from "../../models/message/message";
import {timeout} from "rxjs/operators";
import {InvokeDirective} from 'src/app/details/messages/InvokeDirective'
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages.details.html',
  styleUrls: ['./messages.details.css']
})


export class MessagesDetails {


  constructor(public cookieService: CookieService, private  messageService: MessagesService) {
  }

  @Input() selectedUser: user
  messages: message[];
  newMessage: string;
  pinned: boolean = false;
  @Output("sortList") sortList: EventEmitter<any> = new EventEmitter();
  @Output("returnToList") returnToList: EventEmitter<any> = new EventEmitter();
  @ViewChild('container', {static: false}) container: ElementRef


  sendMessage() {

    if (!this.newMessage.trim()) {
      this.newMessage = '';
      return;
    }

    let m = new message(null, new Date(), this.newMessage, false, this.cookieService.get("username"), this.selectedUser.username, this.pinned)


    this.messageService.sendMessage(m).subscribe(data => {
      this.messages.push(m);
      this.selectedUser.message = m.message;
      this.selectedUser.datetimesend = m.datetimesend;
      let fakeMessage = data as message;
      m.idmessage = fakeMessage.idmessage;
      this.sortList.emit();
    });

    this.newMessage = '';
  }

  pinMessage(message: message){
    message.pinned = !message.pinned;

    if (!message.pinned && this.pinned){
      for (let i = 0; i <this.messages.length ; i++) {
        if (this.messages[i] === message){
          this.messages.splice(i, 1)
        }
      }
    }

    this.messageService.sendMessage(message).subscribe(data => {
    });
  }

  changePinned() {
    this.pinned = !this.pinned;


    if (!this.pinned) {
      this.messageService.getMessages(this.selectedUser.username, this.cookieService.get("username")).subscribe(data => {

        // @ts-ignore
        this.messages = data;

      })
    } else {
      this.messageService.getPinnedMessages(this.selectedUser.username, this.cookieService.get("username")).subscribe(data => {

        // @ts-ignore
        this.messages = data;

      })
    }


  }

  ngOnChanges(changes: any) {


    //todo make api request to get the correct messages.
    if (this.selectedUser !== null) {
      if (!this.pinned) {
        this.messageService.getMessages(this.selectedUser.username, this.cookieService.get("username")).subscribe(data => {

          // @ts-ignore
          this.messages = data;

        })
      } else {
        this.messageService.getPinnedMessages(this.selectedUser.username, this.cookieService.get("username")).subscribe(data => {

          // @ts-ignore
          this.messages = data;

        })
      }
    }


  }

  public scrollToBottom() {

    try {
      if (this.selectedUser !== null) {
        this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
        return;
      }
    } catch (e) {
    }

  }

  public backToMenu(){
    this.messages = []
    this.returnToList.emit()
  }

}





