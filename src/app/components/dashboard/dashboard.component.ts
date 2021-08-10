import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  checkADMN: boolean;
  constructor(private titleService: Title, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Dashboard`);
    if (this.cookieService.get('admin') === 'false')
    {
      this.checkADMN = false;
    }
    else { this.checkADMN = true; }
  }
}
