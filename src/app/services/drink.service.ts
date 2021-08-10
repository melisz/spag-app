import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Contact} from "../models/contact";
import {catchError} from "rxjs/operators";
import {DrinksMenu} from "../models/drinks-menu";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  saveDrink(id: number, contact: DrinksMenu): Observable<boolean>{
    return this.http.post<boolean>(this.API_NAME + `drink/${id}`,
      {
        "name": contact.name,
        "username": "roos@gmail.com"
      }).pipe(
      catchError(this.handleError)
    );
  }

  //delete
  deleteDrink(id: number){
    return this.http.delete(this.API_NAME + `drink/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //findAllContacts
  findAllDrinks(username: string): Observable<DrinksMenu[]>{
    return this.http.post<DrinksMenu[]>(this.API_NAME + `drink/username/${username}/`, username).pipe(
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
