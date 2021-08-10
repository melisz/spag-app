import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-base-menu-selection',
  templateUrl: './base-menu-selection.component.html',
  styleUrls: ['./base-menu-selection.component.css']
})
export class BaseMenuSelectionComponent implements OnInit {
public show: string;
  admin: string;
  constructor(private cookies: CookieService, private titleService: Title) {
    this.titleService.setTitle(`Menu`);
    this.show = "Menu"
  }

  ngOnInit(): void {
    this.admin = this.cookies.get("admin");
  }

 myFunction() {
    document.getElementById("myDropdown1").classList.toggle("show");
 }

 showFunctions(part: string){
   this.show = part;
   document.getElementById("myDropdown1").classList.remove('show');
 }

}
