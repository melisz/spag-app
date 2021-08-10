import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/log.model';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

declare const $: any;

@Component({
  selector: 'app-view-all-logs',
  templateUrl: './view-all-logs.component.html',
  styleUrls: ['./view-all-logs.component.css']
})
export class ViewAllLogsComponent implements OnInit {

  id: number;
  index: number;
  admin: string;
  @Input() items: Log[] = [];

  constructor(private cookieService: CookieService, private _logService: LogService,
              private router: Router, private nfService: NotificationService) {
  }

  ngOnInit(): void {

    this.logService.findAllForYesterday().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        this.items[i] = this.nfService.countLog[i];
        let log = Log.trueCopy(data[i][0]);
        log.restaurant = data[i][1];
        this.items[i] = log;
        if (i == 0) {
          this.id = data[i][0].id;
        }
      }
    });
    this.logService.countLog();

    this.admin = this.cookieService.get('admin');

    if (this.router.url == '/view-all' && this.cookieService.get('admin') == 'false') {
      this.redirect();
    }
    this.index = 0;
  }

  onSelect(item) {
    this.id = item.id;
    this.index = this.items.indexOf(item);
  }

  redirect() {
    this.router.navigate(['dashboard']);
  }

  setPrev(index) {
    if (index == 0) {
      this.index = this.items.length - 1;
    } else {
      this.index = index - 1;
    }
    this.id = this.items[this.index].id;
  }

  setNext(index) {
    if (index == this.items.length - 1) {
      this.index = 0;
    } else {
      this.index = index + 1;
    }
    this.id = this.items[this.index].id;
  }

  readedItem(log: Log) {

    if (log.checked == true) {
      this._logService
        .updateLog(this.items[this.index])
        .subscribe(e => {
            this.items[this.index].checked = e.checked;
            this.nfService.countLog[this.index].checked = e.checked;
          }
        );
    } else {
      this._logService
        .updateLog(this.items[this.index])
        .subscribe(e => {
            this.items[this.index].checked = e.checked;
            this.nfService.countLog[this.index].checked = e.checked;
          }
        );
    }
  }

  get logService(): LogService {
    return this._logService;
  }
}
