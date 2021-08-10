import {Log} from '../../models/log.model';
import {LogService} from '../../services/log.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  uploadForm: FormGroup;
  admin: string;
  logs: Log[];
  selectedLogId: number;
  isSelect: Log;
  year: number;
  month: number;
  day: number;
  fullDate: Date;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  page = 1;
  count = 0;
  pageSize = 10;

  constructor(private _logService: LogService, private activatedRoute: ActivatedRoute,
              private router: Router, private titleService: Title, private http: HttpClient,
              private formBuilder: FormBuilder, private cookieService: CookieService) {

    this.titleService.setTitle(`Logs`);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  convert(date: string) {
    this.logService.convertToDate(new Date(date));
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    this.admin = this.cookieService.get('admin');

    this.logService.sortOnDate();
    this.retrieveLogs();

    if (this._logService.newLog != null) {
      this.selectedLogId = this._logService.newLog.id;
      this.isSelect = this._logService.newLog;
      this.getPageForLog(this._logService.newLog);
    }
  }

  onSubmit() {

    let username = this.cookieService.get('username');
    if (this.uploadForm.get('profile').value != '') {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value, username);

      this.logService.uploadFile(formData).subscribe(
        (res) => {
          window.alert('succesvol opgeslagen.');
        },
        (err) => {
          if (err.status == 400) {
            window.alert('Er is al een menu opgeslagen voor vandaag.');
          }
        });
    } else {
      window.confirm('Uploadveld is leeg, upload a.u.b. een bestand.');
    }
    this.uploadForm.get('profile').setValue('');
  }

  download(id: number) {
    const log = this.logService.findById(id);
    console.log(log.restaurant);
    this.logService.downloadFile(log.date, log.restaurant);
  }

  sortOnDate() {
    this.logs.sort((a, b) => {
      return <any> b.date - <any> a.date;
    });
  }

  getPageForLog(log: Log): void {

    let page = 1;
    let j = 0;

    for (let i = 0; i < this.count; i++) {
      j++;

      if (j == this.pageSize) {
        page++;
        j = 0;
      }

      if (this.logs[i].id == log.id) {
        this.page = page;
        break;
      }
    }
  }

  countLog(): number {
    let count = 0;

    for (let i = 0; i < this.logs.length; i++) {
      count++;
    }
    return count;
  }

  retrieveLogs(): void {
    this.logs = this._logService.findAll();
    this.logService.count = this.logService.countLog();
    this.logService.page = 1;
  }

  resetDate() {
    this._logService.year = null;
    this._logService.month = null;
    this._logService.day = null;
    this.clearInputYMD();
    this.fullDate = null;
    this.logs = this._logService.findAll();
    this.count = this.countLog();
    this.uploadForm = this.formBuilder.group({
      pageControl: ['10']
    });
  }

  clearInputYMD() {
    this.fullDate = null;
    this.year = null;
    this.day = null;
    this.month = null;
  }

  filterDate() {
    this.fullDate = null;
    this._logService.year = this.year;
    this._logService.month = this.month;
    this._logService.day = this.day;

    this.logs = this._logService.findAllOnDate();
    this.count = this.countLog();
    this.sortOnDate();
    this.page = 1;
    this.uploadForm = this.formBuilder.group({
      pageControl: ['10']
    });
  }

  filterDatePicker() {
    const formatDate = this.parse(this.fullDate);

    this._logService.year = formatDate.getFullYear();
    this._logService.month = formatDate.getMonth() + 1;
    this._logService.day = formatDate.getUTCDate();

    this.logService.sortOnDate();
    this.logs = this._logService.findAllOnDate();
    this.logService.count = this.countLog();
    this.logService.page = 1;
  }

  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.includes('/'))) {
      const str = value.split('/');

      const year = parseInt(str[2]);
      const month = parseInt(str[1]) - 1;
      const date = parseInt(str[0]);

      return new Date(year, month, date);
    } else if ((typeof value === 'string') && value === '') {
      return new Date();
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  isSelected(log: Log): any {
    this.logService.newLogId = log.id;
  }

  onSelect(oId: number): any {
    this._logService.mkClone(this._logService.findById(oId));
    this.router.navigate([oId], {relativeTo: this.activatedRoute});
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this log?')) {
      this._logService.deleteLog(id);
      this.ngOnInit();
      window.location.reload();
    }
  }

  get logService(): LogService {
    return this._logService;
  }
}


