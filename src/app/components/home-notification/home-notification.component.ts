import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification, Type} from '../../models/notification.model';
import {Router} from '@angular/router';
import {LogService} from '../../services/log.service';
import {CookieService} from 'ngx-cookie';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-notification',
  templateUrl: './home-notification.component.html',
  styleUrls: ['./home-notification.component.css']
})
export class HomeNotificationComponent implements OnInit {

  showNotification: boolean;
  show: boolean = true;
  isSelectedId: number;
  myEnum: typeof Type = Type;
  admin: string;
  closeResult = '';

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  uploadForm: FormGroup;

  constructor(private _notificationService: NotificationService, private route: Router,
              private _logService: LogService, private cookieService: CookieService,
              private formBuilder: FormBuilder, private modalService: NgbModal, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.admin = this.cookieService.get('admin');
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.openNotification(false);
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

  checkSign(): boolean {
    let check = this.notificationService.check;
    if (this.cookieService.get('admin') == 'true') {
      return !(check[0] == false && this.notificationService.countLogs() == 0 && check[1] == false);
    } else {
      return !(check[0] == false && check[1] == false);
    }
    return true;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  open(content) {
    this.modalService.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }

  isSelected(item: Notification): void {
    this.isSelectedId = item.id;
    if (item.type == Type.mes) {
      this.route.navigateByUrl('/messages');
    } else {
      if (this.cookieService.get('admin') == 'false') {
        this.route.navigateByUrl('/task');
      } else {
        this.route.navigateByUrl('/dashboard');
      }
    }
  }

  get logService(): LogService {
    return this._logService;
  }

  get notificationService(): NotificationService {
    return this._notificationService;
  }
}
