import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Contact} from "../../models/contact";



@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailComponent implements OnInit {
  @Input() item: Contact;
  @Input() contacts: Contact[];

  constructor() {

  }

  ngOnInit(): void {

  }

  close(){

  }
}
