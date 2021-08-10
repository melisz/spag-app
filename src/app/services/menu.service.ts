import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Contact} from "../models/contact";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Menu} from "../models/menu";
import {DishesMenu} from "../models/dishes-menu";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  logs: Contact[];
  logUrl = "http://localhost:8083/menu";
  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Menu[]>{
    return this.http.get<Menu[]>(this.API_NAME + `menu`).pipe(
      catchError(this.handleError)
    );
  }
  // //save
  // saveMenu(id: number, menuselection: DishesMenu[]): Observable<DishesMenu>{
  //   return this.http.post<DishesMenu>(`http://localhost:8083/menu/0`,{
  //     "dishs":
  //       menuselection
  //     }
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

saveMenu(id: number, contact: DishesMenu[]): Observable<boolean>{
    return this.http.post<boolean>(this.API_NAME + `menu/${id}`,
    {
      "id" : 0,
      "dishs" : contact
    }).pipe(
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
