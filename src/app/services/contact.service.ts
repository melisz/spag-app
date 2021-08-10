import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Log} from "../models/log.model";
import {Contact} from "../models/contact";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  logs: Contact[];
  logUrl = "http://localhost:8083/contact";
  logObs$: Observable<Contact[]>;
  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) {

  }
  //save
  saveContact(id: number, contact: Contact): Observable<boolean>{
    return this.http.post<boolean>(this.API_NAME + `contact/${id}`,
      {
      "phoneNumber": contact.phoneNumber,
      "email": contact.email,
      "adres": contact.adres,
      "task": contact.task,
      "name": contact.name,
      "service": contact.service,
      "username": "roos@gmail.com",
      "id": id
      }).pipe(
      catchError(this.handleError)
    );
  }

  //delete
  deletePost(id: number){
    return this.http.delete(this.API_NAME + `contact/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //findAllContacts
  findAllContacts(username: string): Observable<Contact[]>{
    return this.http.post<Contact[]>(this.API_NAME + `contact/username/${username}/`, username).pipe(
      catchError(this.handleError)
    );
  }

  //findByid
  getContactById(id: number): Observable<Contact>{
    return this.http.get<Contact>(this.API_NAME + `contact/find/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  // getLog(id: number): Observable<Log> {
  //   const url = `${this.logUrl}/find/${id}`;
  //   return this.http.get<Log>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  //
  // addLog(log: Log): Observable<Log> {
  //
  //   return this.http.post<Log>(this.logUrl, log)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  //
  // findAll(): Log[] {
  //   return this.logs;
  // }
  //
  // deleteLog(id: number): void {
  //   const url = this.logUrl + '/' + id;
  //   this.http.delete(url)
  //     .pipe(
  //       catchError(this.handleError)
  //     ).subscribe(this.deleteById(id),
  //     (error) => {
  //       alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
  //     });
  // }
  //
  // findById(oId: any): Log {
  //   for (let i = 0; i < this.logs.length; i++) {
  //     if (this.logs[i].id === oId) {
  //       return this.logs[i];
  //     }
  //   }
  //   return null;
  // }
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
