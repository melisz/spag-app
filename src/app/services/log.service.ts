import {Injectable} from '@angular/core';
import {Log} from '../models/log.model';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  readonly API_NAME: string = environment.API_URL + 'log';
  // logUrl = 'http://localhost:8083/log';

  logs: Log[];
  excel = [];
  file: File;
  private _clone2: any;
  year: number;
  month: number;
  day: number;
  newLog: Log;
  newLogId: number;

  count = 0;
  currentIndex = -1;
  page = 1;

  pageSize = 10;
  pageSizes = [5, 10, 15];

  logObs$: Observable<Log[]>;
  viewLogObs$: Observable<Log[]>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.logs = [];

    this.logObs$ = this.restGetLogs();
    this.viewLogObs$ = this.findAllForYesterday();

    this.restGetLogs().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let log = Log.trueCopy(data[i][0]);
        log.restaurant = data[i][1];
        this.logs[i] = log;
        this.sortOnDate();
      }
    });

  }

  getPageForLog(log: Log): void {

    let page = 1;
    let j = 1;

    for (let i = 1; i < this.count; i++) {
      if (j == this.pageSize) {
        page++;
        j = 0;
      }
      j++;
      if (this.logs[i].id == log.id) {
        this.page = page;
        break;
      }
    }
  }

  findAllForYesterday(): Observable<Log[]> {

    var temp = new Date(Date.now());
    temp.setDate(temp.getDate() - 1);
    let dt = this.dateConv(temp);

    const url = this.API_NAME + '/view?date=' + dt;

    return this.http.get<Log[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  dateConv(dt: Date): any {
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }


  sortOnDate() {
    this.logs.sort((a, b) => {
      let newDateB = new Date(b.date);
      let newDateA = new Date(a.date);
      return <any> newDateB - <any> newDateA;
    });
  }

  mkClone<Log>(obj: Log): void {
    this._clone2 = _.cloneDeep(obj);
  }

  getLog(id: number): Observable<Log> {
    const url = `${this.API_NAME}/${id}`;
    return this.http.get<Log>(url).pipe(
      catchError(this.handleError)
    );
  }

  restGetLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.API_NAME + '?restaurant=' + this.cookieService.get('restaurant'))
      .pipe(
        catchError(this.handleError)
      );
  }

  addLog(log: Log): Observable<Log> {

    const url = this.API_NAME + "/" + this.cookieService.get('restaurant');
    return this.http.post<Log>(url, log)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLog(log: Log): Observable<Log> {

    const url = this.API_NAME + '/' + log.id;

    return this.http.put<Log>(url, log)
      .pipe(
        catchError(this.handleError)
      );
  }

  countLog(): number {
    let count = 0;

    for (let i = 0; i < this.logs.length; i++) {
      count++;
    }
    return count;
  }

  findAll(): Log[] {
    return this.logs;
  }

  deleteLog(id: number): void {
    const url = this.API_NAME + '/' + id;
    this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      ).subscribe(this.deleteById(id),
      (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      });
  }

  uploadFile(formData): Observable<any> {
    const url = this.API_NAME + '/uploadFiles?restaurant=' + this.cookieService.get('restaurant');
    return this.http.post<any>(url, formData);
  }

  downloadFile(date: string, restaurant: string) {
    const url = this.API_NAME + '/downloadFile?restaurant=' + restaurant +
      '&date=' + date;

    this.http.get(url, {responseType: 'blob'}).subscribe(
      file => {
        FileSaver.saveAs(file, this.cookieService.get('restaurant') + '.xlsx');
      }, (err) => {
        if (err.status == 404) {
          window.alert('Geen menu\'s voor deze log opgeslagen.');
        }
      });
  }

  downloadFileTodayRestaurant() {

    const url = `${this.API_NAME}/downloadFile/today?restaurant=` + this.cookieService.get('restaurant');
    this.http.get(url, {responseType: 'blob'}).subscribe(
      file => {
        FileSaver.saveAs(file, this.cookieService.get('restaurant') + '.xlsx');
      }, (err) => {
        if (err.status == 404) {
          window.alert('Nog geen menu voor vandaag opgeslagen, upload a.u.b. eerst een menu.');
        }
      });
  }

  findById(oId: any): Log {
    for (let i = 0; i < this.logs.length; i++) {
      if (this.logs[i].id === oId) {
        return this.logs[i];
      }
    }
    return null;
  }

  update(log: Log) {
    if (log.id == null) {
      log.id = Log.incrementId();
      this.logs.push(log);
    } else {
      for (let i = 0; i < this.logs.length; i++) {
        if (this.logs[i].id == log.id) {
          this.logs[i] = log;
          this.updateLog(log);
        }
      }
    }
  }

  deleteById(oId: number): any {
    let i = -1;
    this.logs.forEach(element => {
      i++;
      if (element.id === oId) {
        this.logs.splice(i, 1);
      }
    });
  }

  reset(ide: number): Log {
    for (let i = 0; i < this.logs.length; i++) {
      if (ide === this.logs[i].id) {
        this.logs[i] = this._clone2;
        this.mkClone(this.logs[i]);
        return this.logs[i];
      }
    }
    return null;
  }

  convertToDate(date: Date): string {
    return this.datePicker(date);
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

  findAllOnDate(): Log[] {

    if (this.day == 0) {
      this.day = undefined;
    }

    if (this.month == 0) {
      this.month = undefined;
    }

    if (this.year == 0) {
      this.year = undefined;
    }

    let yearRes = this.yearLogs(null);
    let monthRes = this.monthLogs(null);
    let dayRes = this.dayLogs(null);

    if (this.year == null && this.day == null && this.month == null) {
      return this.logs;

    } else if (this.month == null && this.day == null) {
      // year
      return yearRes;

    } else if (this.year == null && this.month == null) {
      // day
      return dayRes;

    } else if (this.year == null && this.day == null) {

      return monthRes;

    } else if (this.day == null) {

      return this.monthLogs(yearRes);

    } else if (this.month == null) {

      return this.dayLogs(yearRes);

    } else if (this.year == null) {

      return this.dayLogs(monthRes);

    } else {

      let elseLogs = this.monthLogs(yearRes);
      return this.dayLogs(elseLogs);
    }
  }

  yearLogs(items: Log[]): Log[] {

    if (items == null) {
      return this.logs.filter(item => {
        let newDate = new Date(item.date);
        const year = newDate.getFullYear();
        const dateString = `${year}`;

        return dateString === String(this.year);
      });
    } else {
      return items.filter(item => {
        let newDate = new Date(item.date);
        const year = newDate.getFullYear();
        const dateString = `${year}`;

        return dateString === String(this.year);
      });
    }
  }

  monthLogs(items: Log[]): Log[] {

    if (items == null) {
      // month
      return this.logs.filter(item => {
        let newDate = new Date(item.date);
        const monthIndex = (newDate.getMonth() + 1);
        const dateString = `${monthIndex}`;
        return dateString === (String(this.month));
      });
    } else {
      // month
      return items.filter(item => {
        let newDate = new Date(item.date);
        const monthIndex = (newDate.getMonth() + 1);
        const dateString = `${monthIndex}`;
        return dateString === (String(this.month));
      });
    }
  }

  dayLogs(items: Log[]): Log[] {
    if (items == null) {
      // day
      return this.logs.filter(item => {
        let newDate = new Date(item.date);
        const day = newDate.getUTCDate();
        const dateString = `${day}`;
        return dateString === (String(this.day));
      });

    } else {
      // day
      return items.filter(item => {
        let newDate = new Date(item.date);
        const day = newDate.getUTCDate();
        const dateString = `${day}`;
        return dateString === (String(this.day));
      });
    }
  }

  get clone2(): any {
    return this._clone2;
  }

  datePicker(date: Date): any {
    return date.getUTCDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }
}
