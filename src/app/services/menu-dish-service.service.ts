import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Menu} from "../models/menu";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MenuDish} from "../models/menu-dish";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuDishServiceService {
  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  findAll(id: number): Observable<MenuDish[]>{
    return this.http.get<MenuDish[]>(this.API_NAME + `menuDish/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //delete
  deleteMenu(id: number){
    return this.http.delete(this.API_NAME + `menuDish/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
