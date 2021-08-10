import {Component, OnChanges, OnInit} from '@angular/core';
import {Task, Taskstatus} from '../../../models/task';
import {TaskserviceSbService} from '../../../services/taskservice-sb.service';
import {CookieService} from 'ngx-cookie';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-checked-task',
  templateUrl: './checked-task.component.html',
  styleUrls: ['./checked-task.component.css']
})
export class CheckedTaskComponent implements OnInit, OnChanges {
  tasks: Task[];
  newtask: Task;
  editedTask: Task;
  constructor(protected taskSbservice: TaskserviceSbService, private cookieService: CookieService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.newtask = new Task(null, null, null, null, false, null, null, null, null, false, null , null);
    this.editedTask = new Task(null, null, null, null, false, null, null, null, null,  false, null , null);
    this.tasks = [];
    this.taskSbservice.GetNonCheckedTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  ngOnChanges(){
    this.taskSbservice.GetNonCheckedTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  findingTask(id: number): void {
    this.taskSbservice.GetTaskByid(id).subscribe(
      (data) => {this.editedTask = data;
      });
  }
  Checked(): void{
    this.editedTask.checked = true;
    this.newtask = this.editedTask;
    this.taskSbservice.PutTask(this.newtask).subscribe( (data) => {
      this.ngOnChanges();
      // NOTIFICATION
      this.notificationService.subscribeTasks();
    });
  }
}
