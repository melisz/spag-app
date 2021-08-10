import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DishesMenu} from "../models/dishes-menu";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {DishIngredient} from "../models/dish-ingredient";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DishIngredientService {
  readonly API_NAME: string = environment.API_URL;
  constructor(private http: HttpClient) { }

  //save
  saveDishIngredient(dish: DishIngredient): Observable<DishIngredient>{
    return this.http.post<DishIngredient>(this.API_NAME + `dishIngredient`,
      {
        "id_dish" : dish.id_dish,
        "id_ingredient": dish.id_ingredient
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
