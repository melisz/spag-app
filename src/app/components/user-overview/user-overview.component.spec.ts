import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { UserOverviewComponent } from './user-overview.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {AccountsService} from '../../services/accounts.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {FormBuilder, FormsModule} from '@angular/forms';
import {observable, Observable, of, pipe, Subject} from 'rxjs';
import {Task} from '../../models/task';
import {Account} from '../../models/account';
import {A} from '@angular/cdk/keycodes';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {HeaderComponent} from '../header/header.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeNotificationComponent} from '../home-notification/home-notification.component';
import {ElementRef} from '@angular/core';

const accountList = [
  { 'username' : 'admin@admin.nl',
    'password' : '12345',
    'phoneNumber' : '061234567',
    'name' : 'admin',
    'location' : 'Spaghetteria Nieuwe Binnenweg' ,
    'admin' : 1 ,
    'active' : 1},
  { 'username' : 'apple@app.nl',
    'password' : '12345',
    'phoneNumber' : '0208202820',
    'name' : 'Daniel',
    'location' : 'Spaghetteria Van Woustraat' ,
    'admin' : 0 ,
    'active' : 1
  }
];

const account: Account[] = [];

const accounts: Observable<Account[]> = new Observable<Account[]>();

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent;
  let fixture: ComponentFixture<UserOverviewComponent>;
  let componentHtml: HTMLElement;
  let httpMock: HttpTestingController;
  let httpClient: HttpClientTestingModule;
  let alist = accountList;
  let testService: AccountsService;
  let elementRef;
  let cookies: CookieService;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ UserOverviewComponent, NavBarComponent, HeaderComponent, HomeNotificationComponent ],
      imports: [ HttpClientTestingModule,
        HttpClientModule, CookieModule.forRoot(),
        FormsModule, RouterTestingModule],
      providers: [AccountsService, FormBuilder, CookieService],
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClientTestingModule);
    elementRef = TestBed.inject(FormBuilder);
    cookies = TestBed.inject(CookieService);
  }));

  beforeEach(() => {
    account.push(new Account('admin@admin.nl', '12345', '0657885101', 'admin', 'test'));
    account[0].active = true;
    account[0].admin = false;
    cookies.put('login', 'true');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewComponent);
    component = fixture.componentInstance;
    testService = TestBed.get(AccountsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  // it('testing an obserable', fakeAsync () => {
  //   let spy = spyOn(testService, 'getAccounts').and.returnValue(of(alist));
  // })
  //
  // it('should have one row', () => {
  //
  //   const accountsService = fixture.debugElement.injector.get(AccountsService);
  //     const spy = spyOn(accountsService, 'getAccounts').and.returnValue(of(cc));
  //
  //   accountsService.getAccounts().subscribe( (res: Account[]) => {
  //     expect(res[0].username).toEqual('admin@admin.nl');
  //   });
  //   // const req = httpMock.expectOne(
  //   //
  //   //   accountsService.API_NAME + 'Account');
  //
  // //  expect(req.request.method).toBe('GET');
  //
  //   fixture.detectChanges();
  //   expect(componentHtml.querySelectorAll('.td').length).toEqual(1);
  //   // req.flush(accountList);
  // });

  // it("should fetch data asynchronously", async () => {
  //   const fakedFetchedList = [  new accountList ( 'admin@admin.nl','12345',
  //      '061234567', 'admin', 'Spaghetteria Nieuwe Binnenweg' , 1 , 1) , n] ;
  //   const quoteService = fixture.debugElement.injector.get(AccountsService);
  //   // @ts-ignore
  //   let spy = spyOn(AccountsService , 'getAccounts').and.returnValue(of(Promise.resolve(fakedFetchedList)));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.accounts).toBe(fakedFetchedList);
  //   });
  // });




  it( 'Should load a list of accounts',  () => {

    // Arrange (getting UI components)
    // const addButton: HTMLButtonElement = componentHtml.querySelector('#addButton');
    // const addButton: HTMLButtonElement = componentHtml.querySelector('#onAdd');
    // const table: HTMLTableElement = componentHtml.querySelector('#dev-table');
    // const titleInput: HTMLInputElement = componentHtml.querySelector('#ftitel1');
    // const dateInput: HTMLInputElement = componentHtml.querySelector('#dateS');
    // const priorityInput: HTMLInputElement = componentHtml.querySelector('#priority');
    // const descriptionArea: HTMLInputElement = componentHtml.querySelector('#form79textarea');
    //
    //
    // const previous: number = component.tasks.length;

    // const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
    // const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');

    // // Act: Performing search
    // searchInput.value = 'Wibautstraat, 2, Amsterdam';
    // searchInput.dispatchEvent(new Event('input'));
    // fixture.detectChanges(); // Angular should be updated

    // Act: Preforming add task
    // titleInput.value = 'testingTask';
    // titleInput.dispatchEvent(new Event('input'));
    // dateInput.value = '2021-01-19';
    // dateInput.dispatchEvent(new Event('input'));
    // priorityInput.checked = true;
    // priorityInput.dispatchEvent(new Event('input'));
    // descriptionArea.value = 'Lorum Ipsum';
    // descriptionArea.dispatchEvent(new Event('input'));

    // const locationService = fixture.debugElement.injector.get(LocationService);
    const accountsService = fixture.debugElement.injector.get(AccountsService);
    // const spy = spyOn(accountsService, 'getAccounts').and.callThrough();
    const obs = of(account);
    console.log(account);
    const spy = spyOn(accountsService, 'getAccounts').and.returnValues(obs);
    console.log(obs);

    console.log(spy);
    // addButton.click();
    // fixture.detectChanges();
    //expect(component.newtask.description).toEqual(descriptionArea.value);
    fixture.detectChanges(); // Angular should be updated
    // console.log(jasmine.arrayWithExactContents(spy.arguments));
    // Assert: Check if the property was updated
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges();
      const resultTable: HTMLTableElement = componentHtml.querySelector('#devi-table');
      expect(resultTable).toContain('admin@admin.nl');
    });
  });
});
