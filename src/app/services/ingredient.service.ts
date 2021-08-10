import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Contact} from "../models/contact";
import {catchError} from "rxjs/operators";
import {Ingredients} from "../models/ingredients";
import {DishesMenu} from "../models/dishes-menu";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ingredientsList: Ingredients[];
  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  //findAllContacts
  findAllingredients(username: string): Observable<Ingredients[]>{
    return this.http.post<Ingredients[]>(this.API_NAME + `ingredient/username/${username}/`, username).pipe(
      catchError(this.handleError)
    );
  }
  //findAllContacts
  findAllingredientsByDish(id:number): Observable<Ingredients[]>{
    return this.http.get<Ingredients[]>(this.API_NAME + `ingredient/findAll/${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  //save
  saveIngredient(id: number, ingredient: Ingredients): Observable<Ingredients>{
    return this.http.post<Ingredients>(this.API_NAME + `ingredient/${id}`,
      {
      "nameNL" : ingredient.nameNL,
      "nameIT" : ingredient.nameIT
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
