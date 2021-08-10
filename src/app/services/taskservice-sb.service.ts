import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Task, Taskstatus} from '../models/task';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceSbService {
  tasks: Task[];
  readonly API_NAME: string = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

   GetAlltasks(restaurant: string): Observable<Task[]>{
       return this.http.get<Task[]>(this.API_NAME + `tasks/allTaskBranche?restaurant=${restaurant}`);
    }
  TaskListForAdmin(): Observable<Task[]>{
    return this.http.get<Task[]>(this.API_NAME + `tasks/foradmin`);
    }
  GetAllAdmintasks(restaurant: string): Observable<Task[]>{
    return this.http.get<Task[]>(this.API_NAME + `tasks/admintask?restaurant=${restaurant}`);
    }
  GetAllUserDonetasks(madeby: string): Observable<Task[]>{
    return this.http.get<Task[]>(this.API_NAME + `tasks/doneNotAdmin?madeby=${madeby}`);
  }
  GetAllDonetasksForAdmin(): Observable<Task[]>{
    return this.http.get<Task[]>(this.API_NAME + `tasks/admindone`);
  }
  GetPersotasks(username: string): Observable<Task[]>{
    return this.http.get<Task[]>(this.API_NAME + `tasks/perso?username=${username}`);
  }
 GetTaskByid(id: number): Observable<Task> {
    return this.http.get<Task>(this.API_NAME + `tasks/${id}`);
  }
  GetNonCheckedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_NAME + `tasks/nonchecked`);
  }
  GetAllTodo(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_NAME + `tasks/todo`);
  }
  DeleteTask(id: number) {
    return this.http.delete<Task>(this.API_NAME + `tasks/${id}`);
  }
  PostTask(task: Task){
    if(this.cookieService.get('admin') === 'false')
    {
      task.personalTask = true;
      task.restaurant = this.cookieService.get('restaurant');
    }
    else {
      task.personalTask = false;
    }
    task.username = this.cookieService.get('username');
    task.status = Taskstatus.TODO ;
    task.checked = false;
    return this.http.post<Task>(this.API_NAME + 'tasks', task);
  }
  PutTask(task: Task): Observable<Task>{
    return this.http.put<Task>(this.API_NAME + `tasks/${task.id}`, task);
  }
}
