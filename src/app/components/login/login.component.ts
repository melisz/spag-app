import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AccountsService} from '../../services/accounts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  name: string;
  password: string;
  success: boolean;
  disable: boolean = false;
  inActief: boolean;

  constructor(private cookieService: CookieService, private router: Router, private titleService: Title, private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Login`);
    if (this.cookieService.get('login') === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }


  login() {
    this.disable = true;

    if (this.password === undefined || this.name === undefined) {
      this.success = false;
      this.disable = false;
      console.log('1st');
      return;
    }

    this.password = this.password.trim();

    this.accountService.loginAccount(this.name, this.password).subscribe(data => {

      if (data.name == null) {
        this.success = false;
        this.disable = false;
        return;
      }

      this.cookieService.put('user', data.name);
      this.cookieService.put('username', data.username);
      this.cookieService.put('restaurant', data.location);
      this.cookieService.put('admin', String(data.admin));
      this.cookieService.put('login', 'true');
      this.router.navigate(['/dashboard']);
    });
  }
}





