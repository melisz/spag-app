import {Component, Injectable, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {user} from '../../models/message/user';
import {message} from '../../models/message/message';
import {Title} from '@angular/platform-browser';
import {MessagesService} from '../../services/messages.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})

export class MessagesComponent implements OnInit {

  public users: user[] = [];
  private tempArray: user[] = [];
  public selectedUser: user = null;
  public selectedUsers: user[] = [];
  public notification: string = '';
  public sure: boolean = false;
  public userSelected: boolean = false;
  public succes: boolean = false;
  public groupMessage: boolean = false;

  constructor(public cookieService: CookieService, private titleService: Title, private messagesService: MessagesService,
              private notificationService: NotificationService) {

  }

  ngOnInit(): void {

    this.titleService.setTitle(`Berichten`);

    this.messagesService.getAllContacts(this.cookieService.get('username')).subscribe(data => {

      // @ts-ignore
      this.tempArray = data;

      for (let i = 0; i < this.tempArray.length; i++) {
        this.users[i] = user.TrueCopy(this.tempArray[i]);
      }
    });
  }

  public sortList(): void {
    this.users.sort((a, b) => new Date(b.datetimesend).getTime() - new Date(a.datetimesend).getTime());

  }

  public selectUser(any: Event, user: user) {
    this.selectedUser = user;
    this.selectedUser.isread = true;
    this.messagesService.setAllonRead(this.selectedUser.username, this.cookieService.get('username')).subscribe(data => {
      // NOTIFICATION
      this.notificationService.subscribeMessages();
    });
  }

  public addUser(user: user) {
    if (this.selectedUsers.includes(user)) {
      for (let i = 0; i < this.selectedUsers.length; i++) {
        if (this.selectedUsers[i] === user) {
          this.selectedUsers.splice(i, 1);
        }
      }
    } else {
      this.selectedUsers.push(user);
    }
    this.userSelected = this.selectedUsers.length !== 0;
  }

  public sendNotification() {
    this.sure = true;
  }

  public decline() {
    this.sure = false;
  }

  public confirm() {
    for (let i = 0; i < this.selectedUsers.length; i++) {

      let m = new message(null, new Date(), this.notification, false, this.cookieService.get('username'), this.selectedUsers[i].username, true);
      this.messagesService.sendMessage(m).subscribe(data => {
        this.selectedUsers[i].message = m.message;
        this.selectedUsers[i].datetimesend = m.datetimesend;
        this.sortList();
        if (i + 1 === this.selectedUsers.length) {
          this.selectedUsers = [];
          this.userSelected = false;
        }
      });
    }
    this.notification = '';
    this.sure = false;
    this.succes = true;
    this.selectedUser = null;
  }

  public groupMesage() {
    this.userSelected = false;
    this.selectedUsers = [];
    this.groupMessage = !this.groupMessage;
  }

  returnToList() {
    this.selectedUser = null;
  }

  selectAll() {
    for (let i = 0; i < this.users.length; i++) {
      this.selectedUsers[i] = this.users[i];
    }
    this.userSelected = true;
  }

  deselectAll() {
    this.userSelected = false;
    this.selectedUsers = [];

  }
}





