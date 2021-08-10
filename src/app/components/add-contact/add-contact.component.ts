import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Contact} from "../../models/contact";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  @Input() newContact: boolean;
  @Input() contacts: Contact[];
  @Input() wijzigContact: Contact;
  @Output() item  = new EventEmitter <Contact>();
  selectedContact: Contact;
  ot: Contact;

  constructor(private cookieService: CookieService) {
  }
  ngOnInit(): void {
    this.selectedContact = this.wijzigContact;
  }
  saveContact(id: number , name: string, adres: string, telefoonnummer: string, email: string, task: string, service: string){
    this.ot = new Contact(telefoonnummer,email,adres,task,name,service,"roos@gmail.com");
    this.ot.setid(id);
    this.item.emit(this.ot);
  }
}
