import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../../models/task';
import {TaskserviceService} from '../../../services/taskservice.service';
import {TaskserviceSbService} from '../../../services/taskservice-sb.service';
import {CookieService} from 'ngx-cookie';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-personaltask',
  templateUrl: './personaltask.component.html',
  styleUrls: ['./personaltask.component.css']
})
export class PersonaltaskComponent implements OnInit {
  tasks: Task[];
  newtask: Task;
  editedTask: Task;
  @ViewChild('aform', {static: false})
  private aform: NgForm;

  constructor(protected taskSbservice: TaskserviceSbService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.newtask = new Task(null, null, null, null, false, null, null, null, null,  false, null , null);
    this.editedTask = new Task(null, null, null, null, false, null, null, null, null, false, null , null);
    this.tasks = [];
    this.taskSbservice.GetPersotasks(this.cookieService.get('username')).subscribe((data) => {
      this.tasks = data;
    });

  }
  OnaddTask(): void {
    this.taskSbservice.PostTask(this.newtask).subscribe(data => this.tasks.push(data));
    this.clearField();
    const myModal = document.getElementById('pModal');
    myModal.style.display = 'none';
  }
  findingTask(id: number): void {
    this.taskSbservice.GetTaskByid(id).subscribe(
      (data) => {this.editedTask = data;
      });
  }
  clearField(): void {
    this.newtask = new Task(null, null, null, null, false, null, null, null, null, false, null, null);
    this.aform.form.markAsUntouched();
    this.aform.form.markAsPristine();
  }
}
