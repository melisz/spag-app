import { TestBed } from '@angular/core/testing';

import { AccountsService } from './accounts.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {Account} from '../models/account';

describe('AccountsService', () => {
  let service: AccountsService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        HttpClientModule,
        CookieModule.forRoot()
      ]
    });
    service = TestBed.inject(AccountsService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should create an account', () => {
  //   const newAcc : Account = { username: 'daniel@hva.nl', _active : true, _admin: false, _location: 'Amsterdam', _name: 'daniel', _password: '123456',
  //     _phoneNumber: '0677777', _username: 'daniel@hva.nl'  };
  //
  //   service.createAccount(newAcc).subscribe(
  //     data => expect(data).toEqual(newAcc, 'should return an account'),
  //     fail
  //   );
  //
  //   // addEmploye should have made one request to POST employee
  //   const req = httpMock.expectOne(service.API_NAME + 'Account');
  //   expect(req.request.method).toEqual('POST');
  //   expect(req.request.body).toEqual(newAcc);
  //
  //   // Expect server to return the employee after POST
  //   // @ts-ignore
  //   const expectedResponse = new httpMock({ status: 201, statusText: 'Created', body: newAcc });
  //   req.event(expectedResponse);
  // });
  it('should return an account', () => {
    const dummydata = [{username: 'admin@admin.nl', _active : true, _admin: false, _location: 'Spaghetteria Nieuwe Binnenweg', _name: 'daniel', _password: '123456',
           _phoneNumber: '0677777', _username: 'admin@admin.nl'}];
    service.getAccounts().subscribe((res) => {
           expect(res).toEqual(jasmine.arrayContaining(dummydata)); });
    const req = httpMock.expectOne(service.API_NAME + 'Account');
    expect(req.request.method).toBe('GET');
   // req.flush(dummydata);
  });
});
