import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Contact} from "../models/contact";
import {catchError} from "rxjs/operators";
import {DishesMenu} from "../models/dishes-menu";
import {Menu} from "../models/menu";
import {Ingredients} from "../models/ingredients";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DishService {
   i : Ingredients;
  readonly API_NAME: string = environment.API_URL;
  constructor(private http: HttpClient) { }

  //save
  saveDish(id: number, dish: DishesMenu): Observable<number>{
    return this.http.post<number>(this.API_NAME + `dish/${id}`,
      {
        "name" : dish.name,
        "username": "roos@gmail.com",
        "categorie" : dish.categorie,
        "ingredients" : [dish.ingredients]
      }).pipe(
      catchError(this.handleError)
    );
  }

  // //save
  // saveMenu( contact: Menu): Observable<boolean>{
  //   return this.http.post<boolean>(`http://localhost:8083/menu/${id}`,
  //     {
  //       "name" : contact.name,
  //       "categorie" : contact.categorie,
  //       "username": "info@spaghetteria.nl",
  //       "id": 0
  //     }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  //delete
  deletePost(id: number){
    return this.http.delete(this.API_NAME + `dish/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //findAllContacts
  findAllDishes(username: string): Observable<DishesMenu[]>{
    return this.http.post<DishesMenu[]>(this.API_NAME + `dish/username/${username}/`, username).pipe(
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
