import {Component, OnInit} from '@angular/core';
import {Log} from '../../models/log.model';
import {LogService} from '../../services/log.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.component.html',
  styleUrls: ['./home-log.component.css']
})
export class HomeLogComponent implements OnInit {

  logs: Log[];
  logDate: string;
  admin: string;

  constructor(private _logService: LogService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.admin = this.cookieService.get('admin');
    this.logs = this._logService.findAll();
  }

  get logService(): LogService {
    return this._logService;
  }
}
