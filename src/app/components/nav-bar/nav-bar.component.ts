import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {element} from 'protractor';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent implements OnInit, AfterViewInit {

  // This is the check if someone is an admin
  admin: boolean;
  // The name of the restaurant
  restaurant: string;
  name: string;

  logo: String = 'assets/images/spaghetteria.svg';


  constructor(public cookieService: CookieService, private router: Router) {
    // Here we check in the cookieService if they are an admin or not.
    this.admin = (this.cookieService.get('admin') === 'true');
    // Here we sit the restaurant for the user.
    this.restaurant = this.cookieService.get('restaurant');

    this.name = this.cookieService.get('user');
  }

  ngOnInit(): void {
    //Because nav is on everypage except login, We can redirect to login if the user is not logged in.
    if (this.cookieService.get('login') !== 'true') {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    $('#sidebar').css('height', $(document.body).height());
    $(document.body).on('resize', function() {
      $('#sidebar').css('height', $(document.body).height());
    });
  }

  clickNav(): void {
    $('#sidebar').toggleClass('active');
  }


  getSelectedRestaurant(restaurant: string): void {
    //Here we sit the new cookie value of the restaurant. All things that are related to this are automatically updated.
    this.cookieService.put('restaurant', restaurant);
    window.location.reload();
  }

  logout(): void {
    this.cookieService.removeAll();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
