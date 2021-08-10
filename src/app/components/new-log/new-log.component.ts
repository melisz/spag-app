import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Log} from '../../models/log.model';
import {LogService} from '../../services/log.service';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie';
import {FormBuilder, NgForm} from '@angular/forms';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-new-log',
  templateUrl: './new-log.component.html',
  styleUrls: ['./new-log.component.css']
})
export class NewLogComponent implements OnInit, AfterViewChecked {

  log: Log;
  editLogId: number;
  empty = false;

  @Output() refresh = new EventEmitter();
  @ViewChild('takeInput2', {static: false}) InputVar2: ElementRef;

  @ViewChild('logForm', {static: false})
  private logForm: NgForm;

  private childParamsSubscription: Subscription = null;

  constructor(private _logService: LogService,
              private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title,
              private cookieService: CookieService, private formBuilder: FormBuilder, protected changeDetectorRef: ChangeDetectorRef) {
    this.titleService.setTitle(`Change-Logs`);
  }

  ngOnInit(): void {
    this.childParamsSubscription =
      this.activatedRoute.params.subscribe((params: Params) => {
        if (+params['id'] != null && this.cookieService.get('admin') == 'true') {
          this.redirect();
          this.setLogId(-1);
        } else {
          if (this.logService.findById(+params['id']) != null || params['id'] == -1) {
            this.setLogId(+params['id'] || -1);
          } else {
            this.router.navigateByUrl('log');
          }
        }
      });

    if (this.editLogId == -1) {
      this.log = new Log();
      this.log.date = this.datePicker();
    } else {
      this.log = this.logService.findById(this.editLogId);
    }

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.cancel();
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  datePicker() {

    var d = new Date(Date.now()),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  save() {

    if (this.logForm.form.invalid) {
      window.confirm('Vul a.u.b. de verplichte velden in.');
      return;
    }

    this.log.username = this.cookieService.get('username');

    if (this.log.id == null) {
      this.logService
        .addLog(this.log)
        .subscribe(log => {

            let newLOG = Log.trueCopy(log);
            newLOG.restaurant = this.cookieService.get('restaurant');
            this.logService.logs.push(newLOG);
            this.logService.sortOnDate();
            this.logService.getPageForLog(newLOG);
            this.logService.newLogId = newLOG.id;
            window.alert('Succesfull saved');
          },
          err => {
            if (err) {
              catchError(err);
              window.alert('Er is al een log voor vandaag opgeslagen.');
              this.editLogId = 0;
            }
          }
        );
    } else {
      this.logService
        .updateLog(this.log)
        .subscribe(log => {
            let newLOG = Log.trueCopy(log);
            newLOG.restaurant = this.cookieService.get('restaurant');
            this.logService.update(newLOG);
            this.logService.getPageForLog(newLOG);
            this.logService.newLogId = newLOG.id;
          }
        );
    }

    this.logService.mkClone(this.log);

    this.router.navigate(['log']);
    this.editLogId = null;
  }

  redirect() {
    this.router.navigate(['dashboard']);
  }

  clear() {
    this.InputVar2.nativeElement.value = '';
    const date = this.log.date;
    const id = this.log.id;
    this.log = new Log();
    this.log.date = date;
    this.log.id = id;
    this.logService.update(this.log);
  }

  cancel() {
    this.logService.reset(this.editLogId);
    this.logService.newLog = this.log;
    this.refresh.emit(this.editLogId);
    this.editLogId = null;
  }

  reset() {
    this.log = this.logService.reset(this.editLogId);
  }

  navigateToLog() {
    if (confirm('Are you sure you want to cancel?')) {
      this.logService.reset(this.editLogId);
      this.router.navigate(['log']);
      this.editLogId = null;
    }
  }

  showSelected() {
    if (this.logService.findById(this.editLogId) != null) {
      this.log = this.logService.findById(this.editLogId);
    }
  }

  get logService(): LogService {
    return this._logService;
  }

  private setLogId(param: any) {
    this.editLogId = param;
  }
}

