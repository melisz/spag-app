import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Task, Taskstatus} from '../../../models/task';
import {TaskserviceService} from '../../../services/taskservice.service';
import {TaskserviceSbService} from '../../../services/taskservice-sb.service';
import {CookieService} from 'ngx-cookie';
import {AccountsService} from '../../../services/accounts.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit, OnChanges {
  popupAdd = false;
  AllTasks: Task[];
  tasks: Task[];
  taskDo: Task[];
  dis1: boolean;
  check: boolean;
  restaurant: any[];
  test: Task;
  newtask: Task;
  d: Date = new Date();
  isSelected;
  id: number = null;
  current;
  editedTask: Task;
  checkADMN: boolean;
  selectedRes: string;
  @ViewChild('aform', {static: false})
  private aform: NgForm;

  // tslint:disable-next-line:max-line-length
  constructor(protected taskservice: TaskserviceService, private taskSbservice: TaskserviceSbService, private cookieService: CookieService, private accountservice: AccountsService) {
  }

  ngOnInit(): void {
    this.dis1 = false;
    this.tasks = [];
    this.taskDo = [];
    this.AllTasks = [];
    this.test = new Task(null, null, null, null, false, null, null, null, null, false, null, null);
    this.newtask = new Task(null, null, null, null, false, null, null, null, null, false, null, null);
    this.editedTask = new Task(null, null, null, null, false, null, null, null, null, false, null, null);
    if (this.cookieService.get('admin') === 'false') {
      this.checkADMN = false;
      this.taskSbservice.GetAllAdmintasks(this.cookieService.get('restaurant')).subscribe((data) => {
        this.tasks = data;
      });
    } else {
      this.checkADMN = true;
      this.accountservice.GetAllRestaurant().subscribe((data) => {
        this.restaurant = data;
      });
      this.taskSbservice.GetAllTodo().subscribe((data) => {
        this.tasks = data;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  OnaddTask(): void {
    if (this.cookieService.get('admin') === 'true') {
      this.newtask.restaurant = this.selectedRes;
    }
    this.taskSbservice.PostTask(this.newtask).subscribe(data => this.tasks.push(data));
    this.clearField();
    const myModal = document.getElementById('myModal');
    myModal.style.display = 'none';
    }
  findTask(nameT: string): Task {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].title === nameT) {
        if (this.tasks[i].priority === false) {
          this.check = false;
        } else {
          this.check = true;
        }
        this.test = this.tasks[i];
      }
      // tslint:disable-next-line:align
    }
    return this.test;
  }

  clearField(): void {
    this.newtask = new Task(null, null, null, null, false, null, null, null, null, false, null, null);
    this.selectedRes = 'Kies een restaurant';
    this.aform.form.markAsUntouched();
    this.aform.form.markAsPristine();
  }

  FindingTask(id: number) {
    this.taskSbservice.GetTaskByid(id).subscribe(
      (data) => {
        this.editedTask = data;
      });
  }
}
