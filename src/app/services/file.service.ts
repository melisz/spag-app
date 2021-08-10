import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  upload(file): Observable<any> {
    return this.http.post(this.API_NAME + `/file/upload`, file);
  }

  download(name: string){
    return this.API_NAME + `/files/${name}`;
  }
}
