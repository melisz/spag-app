import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  admin: string;

  constructor(private cookieService: CookieService, private titleService: Title) {
    this.titleService.setTitle(`Contacten`);
  }

  ngOnInit(): void {
    this.admin = this.cookieService.get("admin");
  }

}
