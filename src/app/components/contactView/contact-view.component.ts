import { Component, OnInit } from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {IConstructorExclusionDescriptor} from "tslint/lib/rules/completed-docs/constructorExclusion";
import {Contact} from '../../models/contact';
import {setOffsetToUTC} from "ngx-bootstrap/chronos/units/offset";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {AlertComponent} from "ngx-bootstrap/alert";
import {count} from "rxjs/operators";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  private id: number;
  public contact: Contact;
  selectedContact: Contact;
  contacts: Contact[];
  showContactPopup: boolean = false;
  currentItem: number;
  admin: string;
  showAddPopup: boolean = false;
  newContact: boolean = false;
  static count = 8;
  username: string;
   contactDa :Subscription;
   idContact :Contact;

  constructor(private cookieService: CookieService, public router: Router, private _contactservice: ContactService ) {
  }

  ngOnInit(): void {
    this.admin = this.cookieService.get("admin");
    this._contactservice.findAllContacts("roos@gmail.com").subscribe((data) =>
    {
      this.contacts = data;
    });

  }

  showPopUp(id: number) {
    this.showContactPopup = true;
    this.currentItem =  id;
    if(id==null){
      this.showAddPopup = true;
    }
    for(let i = 0; i < this.contacts.length; i++){
      if(this.contacts[i].id == id){
        this.selectedContact = this.contacts[i];
      }
    }
  }
  showAddPopUp(contact: Contact) {
    if(contact == null){
      this.newContact = true;
    }else{
      this.newContact = false;
    }
    this.selectedContact = contact;
    this.showContactPopup = false;
    this.showAddPopup = true;
  }

  addItem(newItem: Contact) {
    this._contactservice.saveContact(newItem.id, newItem).subscribe((data => {
      this.ngOnInit();
    }));

  }

  deleteContact(contact: number) {
    if (confirm("Weet u zeker dat u dit contact wil verwijderen?")) {
      this._contactservice.deletePost(contact).subscribe((data) => {
        for(let i = 0; i < this.contacts.length; i++){
          if(this.contacts[i].id == contact){
            this.contacts.splice(i,1);
          }
        }
      });
    }
  }
}
