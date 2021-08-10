import {Injectable} from '@angular/core';
import {Notification} from '../models/notification.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Task} from '../models/task';
import {CookieService} from 'ngx-cookie';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {Log} from '../models/log.model';
import {message} from '../models/message/message';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly API_NAME: string = environment.API_URL;

  nfs: Notification[];
  messages: message[];
  countLog: Log[] = [];
  check: boolean[] = [false, false];
  taskObs: Observable<any>;
  messageOBS: Observable<any>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.nfs = [];
    this.messages = [];

    this.subscribeTasks();
    this.subscribeMessages();
    this.subscribeLogs();

  }

  subscribeLogs() {
    if (this.cookieService.get('admin') == 'true') {
      this.findLogs().subscribe(data => {
        if (data.length == 0) {
          this.countLog = [];
        } else {
          for (let i = 0; i < data.length; i++) {
            let log = Log.trueCopy(data[i][0]);
            log.restaurant = data[i][1];
            this.countLog[i] = log;
          }
        }
      });
    }
  }

  subscribeTasks() {
    this.nfs = [];
    if (this.cookieService.get('admin') == 'true') {
      this.findAllTasks().subscribe(data => {
        if (data.length == 0) {
          this.nfs = [];
          this.check[1] = false;
        } else {
          for (let i = 0; i < data.length; i++) {
            let notif = new Notification(Notification.trueCopyTask(data[i][0]), null, data[i][1]);
            notif.location = data[i][1];
            this.nfs.push(notif);
            this.check[1] = true;
          }
        }
      });
    } else {
      this.findAllTasks().subscribe(data => {
        if (data.length == 0) {
          this.nfs = [];
          this.check[1] = false;
        } else {
          for (let i = 0; i < data.length; i++) {
            let notif = new Notification(Notification.trueCopyTask(data[i]), null, null);
            this.nfs.push(notif);
            this.check[1] = true;
          }
        }
      });
    }
  }

  countLogs(): number {
    let count = 0;
    for (let i = 0; i < this.countLog.length; i++) {
      if (Log.trueCopy(this.countLog[i]).checked == false) {
        count++;
      }
    }
    return count;
  }

  findLogs(): Observable<Log[]> {

    var temp = new Date(Date.now());
    temp.setDate(temp.getDate() - 1);
    let dt = this.dateConv(temp);

    const url = this.API_NAME + 'log/view?date=' + dt;

    let obs = this.http.get<Log[]>(url)
      .pipe(
        catchError(this.handleError)
      );

    return obs;
  }

  subscribeMessages() {
    this.findAllMessages().subscribe(data => {
      if (data.length == 0) {
        this.messages = [];
        this.check[0] = false;
      } else {
        this.messages = data;
        this.check[0] = true;
      }
    });

  }

  countMes(): number {
    return this.messages.length;
  }

  dateConv(dt: Date): any {
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  findAllTasks(): Observable<Notification[]> {

    if (this.cookieService.get('admin') == 'true') {

      const url = this.API_NAME + 'tasks/checkedByAdmin';

      this.taskObs = this.http.get<Task[]>(url)
        .pipe(
          catchError(this.handleError)
        );

      return this.taskObs;

    } else {

      var temp = new Date(Date.now());
      temp.setDate(temp.getDate() + 14); // two weeks before deadline
      let dt = this.dateConv(temp);

      const url = this.API_NAME + 'tasks/deadline?date=' + dt +
        '&location=' + this.cookieService.get('restaurant');

      this.taskObs = this.http.get<Task[]>(url)
        .pipe(
          map(events => events.sort((b, a) => new Date(b.date).getDate() -
            new Date(a.date).getDate()))
        ).pipe(catchError(this.handleError));
      return this.taskObs;
    }
  }

  calculateDiff(sentDate) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  findAllMessages(): Observable<message[]> {

    const url = this.API_NAME + 'message/notifications?location=' + this.cookieService.get('username');

    this.messageOBS = this.http.get<Message[]>(url)
      .pipe(
        catchError(this.handleError)
      );
    return this.messageOBS;
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
