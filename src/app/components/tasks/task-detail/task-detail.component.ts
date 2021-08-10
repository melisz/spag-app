import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Task, Taskstatus} from '../../../models/task';
import {TaskserviceService} from '../../../services/taskservice.service';
import {Title} from '@angular/platform-browser';
import {TaskserviceSbService} from '../../../services/taskservice-sb.service';
import {CookieService} from 'ngx-cookie';
import {FileService} from '../../../services/file.service';
import {AccountsService} from '../../../services/accounts.service';
import {DatePipe} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [DatePipe]
})
export class TaskDetailComponent implements OnInit, OnChanges {
  @Input() selectedtask;
  SelectedOne: Task;
  popupAdd = false;
  AllTasks: Task[];
  restaurant: any[];
  tasks: Task[];
  taskDo: Task[];
  dis1: boolean;
  check: boolean;
  cmp = 0;
  test: Task;
  newtask: Task;
  EditedTask: Task;
  current;
  isSelected;
  ids: number = null;
  errorMessage: string;
  selectedFile: File;
  fileName: string;
  fileExtension: string;
  bestand: string;
  isAdmin: boolean;
  imageName: any;
  file: File;
  retrieveImage: string;
  onTrue = false;
  selectedRes: string;
  progres1 = false;
  progres2 = false;
  progres3 = false;
  testyy: Date;
  @ViewChild('addform', {static: false})
  private addform: NgForm;

  constructor(private taskservice: TaskserviceService, private titleService: Title,
              private taskSbservice: TaskserviceSbService, private cookieService: CookieService,
              private fileService: FileService, private accountservice: AccountsService, private notificationService: NotificationService) {
    this.titleService.setTitle(`Taken`);
  }

  static trueCopy(quiz: Task): Task{return Object.assign(new Task(quiz.id, quiz.title, quiz.description,
    quiz.status, quiz.priority, quiz.date, quiz.checked, quiz.username, quiz.madeBy, quiz.personalTask,
    quiz.restaurant, quiz.file_name), quiz); }

  ngOnInit(): void {
    this.SelectedOne = null;
    this.dis1 = false;
    this.tasks = [];
    this.taskDo = [];
    this.AllTasks = [];
    this.newtask = new Task(null, null, null, null, false, null, null, null, null, null, null, null);
    this.test = new Task(null, null, null, null, false, null, null, null, null, null, null, null);
    this.EditedTask = new Task(null, null, null, null, false, null, null, null, null, null, null, null);
    if (this.cookieService.get('admin') === 'false'){
    this.taskSbservice.GetAlltasks(this.cookieService.get('restaurant')).subscribe((data) => {
      this.tasks = data;
    });
    this.isAdmin = false;
    }
    else {
      this.taskSbservice.TaskListForAdmin().subscribe((data) => {
        this.tasks = data;
      });
      this.isAdmin = true;
      this.accountservice.GetAllRestaurant().subscribe((data) => {
      this.restaurant = data;
      });
    }
    this.Filter();
    this.ids = null;
    this.fileName = null;
    this.fileExtension = null;
    this.bestand = null;
    this.imageName = null;
    this.onTrue = false;
  }
  ngOnChanges(){
    if (this.cookieService.get('admin') === 'false'){
      this.taskSbservice.GetAlltasks(this.cookieService.get('restaurant')).subscribe((data) => {
        this.tasks = data;
      });
    }
    else {
      this.taskSbservice.TaskListForAdmin().subscribe((data) => {
        this.tasks = data;
      });
    }
  }
  Filter(): void{
    this.taskDo = [];
    if (this.cookieService.get('admin') === 'false'){
    this.taskSbservice.GetAllUserDonetasks(this.cookieService.get('username')).subscribe((data) => {
      this.taskDo = data;
      this.cmp = data.length; });
     }
      else {
      this.taskSbservice.GetAllDonetasksForAdmin().subscribe((data) => {
        this.taskDo = data;
        this.cmp = data.length; });
      }
  }
  OnaddTask(): void{
    if (this.cookieService.get('admin') === 'true')
    {
     this.newtask.restaurant = this.selectedRes;
    }
    this.taskSbservice.PostTask(this.newtask).subscribe(data => {
      this.tasks.push(data);

      // NOTIFICATION
      this.notificationService.subscribeTasks();
    });
    this.clearField();
    const myModal = document.getElementById('modalPoll-1');
    myModal.style.display = 'none';
  }
  onRowSelected(i: number): void {
    this.taskservice.RowSelected(i);
    this.selectedtask = this.tasks[i];
    this.ids = this.selectedtask.id;
    this.current = i;
    this.isSelected = this.taskservice.isSelected;
    const checkAdmin = this.cookieService.get('admin');
  }
  onDoneSelected(i: number): void {
    this.selectedtask = this.taskDo[i];
    this.ids = this.selectedtask.id;
    this.current = i;
    this.isSelected = this.taskservice.isSelected;
    const checkAdmin = this.cookieService.get('admin');
  }

  makeCopy(): void{
    this.test = TaskDetailComponent.trueCopy(this.EditedTask);
  }

  FindingTask(idT: number): void
  {
    this.taskSbservice.GetTaskByid(idT).subscribe(
      (data) => {this.EditedTask = data;
                 this.makeCopy();
      });
  }

  clearField(): void{
    this.newtask = new Task(null, null, null, null, false, null,
      null, null, null, null, null, null);
    this.selectedRes = 'Kies een restaurant';
    this.addform.form.markAsUntouched();
    this.addform.form.markAsPristine();
  }
  remove(i: any): void {
     this.onRowSelected(i);
     this.taskSbservice.DeleteTask(this.ids).subscribe((data) => {
     this.tasks.splice(i, 1);
     this.Filter();
     this.ngOnChanges();
     this.errorMessage = null;
    }, (error) => {
      console.error(error);

      if (error.status === 403) {
        this.errorMessage = 'insufficient rights for this operation';
      } else {
        this.errorMessage = error.message.toString();
      }
    });
  }
  removeDone(id: number, i: any): void
  {
    this.ids = id;
    const r = confirm('Taak Verwijderen ?');
    if (r === true){
    this.taskSbservice.DeleteTask(this.ids).subscribe((data) => {
      this.taskDo.splice(i, 1);
      this.Filter();
      this.ngOnChanges();
      this.errorMessage = null;
    }, (error) => {
      console.error(error);

      if (error.status === 403) {
        this.errorMessage = 'insufficient rights for this operation';
      } else {
        this.errorMessage = error.message.toString();
      }
    });
    }
  }
  onSave(): void {
    if (this.selectedtask.status === 'TODO' && this.test.status === 'DONE')
    {
      this.test.madeBy = this.cookieService.get('username');
    }
    if (this.test.status === 'DONE'){
      this.bestand = this.fileName;
      this.test.file_name = this.bestand;
      this.test.setFile(this.bestand);
    }
    this.taskSbservice.PutTask(this.test).subscribe( (data) => {
      this.tasks[this.tasks.indexOf(this.selectedtask)] = data;
      this.Filter();
      // NOTIFICATION
      this.notificationService.subscribeTasks();
    });
    const modal2 = document.getElementById('modalPoll-2');
    modal2.style.display = 'none';
    // this.onTrue = true;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
  }

  onUpload(){
    if (this.test.status === 'DONE' && this.retrieveImage === null ){
      const fd = new FormData();
      this.fileName = 'task_img_' + this.test.id;
      this.fileExtension = this.selectedFile.name.split('?')[0].split('.').pop();
      fd.append('file', this.selectedFile, this.fileName);
      this.fileService.upload(fd).subscribe(res => {
      });
      this.onTrue = false;
      const modal2 = document.getElementById('modalPoll-2');
      modal2.style.display = 'none';
      this.onTrue = true;
      this.progres1 = !this.progres1;
      setTimeout(() => {this.onSwitch(); }, 2000);
      setTimeout(() => {this.onSwitch(); }, 4000);
      setTimeout(() => {this.onSave(); }, 5000);
      setTimeout(() => {this.onSwitch(); }, 6000);

    }
    else {
      this.onSave();
    }
  }

  isExist(){
    if (this.test.file_name === null){
      return false;
    }else {
      this.retrieveImage = this.fileService.download(this.test.file_name);
      return true; }
  }

  uploadFileCheck(){
    if (this.test.status === 'DONE' && this.isExist() === false){
      return true;
    }
    else {
      return false;
    }
  }
  onSwitch() {
    if (this.progres1){
      this.progres1 = !this.progres1;
      this.progres2 = !this.progres2;
    }
    else if (this.progres2 && !this.progres1){
      this.progres2 = !this.progres2;
      this.progres3 = !this.progres3;

    }
    else if (this.progres3 && !this.progres2){
      this.progres3 = !this.progres3;
    }
  }
  Checked(i: number){
    this.selectedtask = this.tasks[i];
    this.selectedtask.checked = true;
    this.newtask = this.selectedtask;
    this.taskSbservice.PutTask(this.newtask).subscribe( (data) => {
      this.Filter();
      this.ngOnChanges();
    });
  }
  Bevestiging(): void{
    if (this.selectedFile == null)
    {
      alert('Upload eerst een bestand aub');
    }
    else {
    const fd = new FormData();
    this.fileName = 'task_img_' + this.test.id;
    this.fileExtension = this.selectedFile.name.split('?')[0].split('.').pop();
    fd.append('file', this.selectedFile, this.fileName);
    this.fileService.upload(fd).subscribe(res => {
    });
    this.test.status = Taskstatus.DONE;
    this.onTrue = false;
    const modal2 = document.getElementById('modalPoll-3');
    modal2.style.display = 'none';
    this.onTrue = true;
    this.progres1 = !this.progres1;
    setTimeout(() => {this.onSwitch(); }, 2000);
    setTimeout(() => {this.onSwitch(); }, 4000);
    setTimeout(() => {this.onSave(); }, 5000);
    setTimeout(() => {this.onSwitch(); }, 6000);
  }}
}
