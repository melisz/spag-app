import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  readonly API_NAME: string = environment.API_URL;

  constructor(private httpClient: HttpClient) {

  }

  createAccount(account: Account): Observable<Account> {
    let body: any = {
      "username": account.username,
      "password": account.password,
      "phoneNumber": account.phoneNumber,
      "name": account.name,
      "location": account.location,
      "admin": account.admin,
      "active": account.active
    };
    return this.httpClient.post<Account>(this.API_NAME + 'Account', body);
  }
  GetAllRestaurant(){
    return this.httpClient.get<any[]>(this.API_NAME + `Account/restaurant`);
  }

  getAccounts(): Observable<Account[]>{
    console.log('Ive been called');
    return this.httpClient.get<Account[]>(this.API_NAME + 'Account');
  }

  findAccount(username: string): Observable<Account>{
    return this.httpClient.get<Account>(this.API_NAME + 'Account/user?username=' + username);
  }

  updateAccount(account: Account): Observable<Account>{
    let body: any = {
      "username": account.username,
      "password": account.password,
      "phoneNumber": account.phoneNumber,
      "name": account.name,
      "location": account.location,
      "admin": account.admin,
      "active": account.active
    };
    return this.httpClient.put<Account>(this.API_NAME + `Account/user?username=${account.username}`, body);
  }

  loginAccount(username: string, password: string){
    let body: any = {
      "username": username,
      "password": password
    };
    return this.httpClient.post<Account>(this.API_NAME + 'Account/login', body);
  }
}
