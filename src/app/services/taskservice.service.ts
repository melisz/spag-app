import { Injectable } from '@angular/core';
import {Task, Taskstatus} from '../models/task';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'any'

})
export class TaskserviceService {
  public tasks: Task[];
  public personalTask: Task[];
  public generalTask: Task[];
  isSelected = false;
  current;
  selectedtask: Task;
  test: Task;
  count = 0;
  readonly API_NAME: string = environment.API_URL;
  // task3 = new Task(100, 'task3', 'aaa', Taskstatus.DONE, false,'2020-09-11');
  // task4 = new Task(200, 'task4', 'aaa', Taskstatus.TODO, true, '2021-11-11');
  // task5 = new Task(300, 'Personal Task1', 'My Duties', Taskstatus.TODO, true,'2020-09-19');
  // task6 = new Task(400, 'Personal Task2', 'Clean up', Taskstatus.TODO, false, '2021-10-11');
  constructor() {
    this.tasks = [];
    this.personalTask = [];
    this.generalTask = [];

    this.AddingTask();
  }
  AddingTask(){
    // this.tasks.push(this.task3, this.task4);
    // this.personalTask.push(this.task5, this.task6);

  }
  addNewTask(task: Task){

      task.status = Taskstatus.TODO ;
      task.id = this.count++;
      this.tasks.push(task);
      // this.tasks.push(Task.createRandomTask());
      // console.log(this.newtask.priority);
      // this.Filter();
      // this.clearField();
    this.tasks.concat(this.personalTask).sort(((a, b) => (a.date > b.date) ? 1 : -1));

  }
  addPersonalTask(task: Task){

    task.status = Taskstatus.TODO ;
    task.id = this.count++;
    this.personalTask.push(task);
    // this.tasks.push(Task.createRandomTask());
    // console.log(this.newtask.priority);
    // this.Filter();
    // this.clearField();
    this.tasks.concat(this.personalTask).sort(((a, b) => (a.date > b.date) ? 1 : -1));
  }
  findAll(): Task[]{
    return this.tasks.concat(this.personalTask).sort(((a, b) => (a.date > b.date) ? 1 : -1));
    // return this.tasks.sort(((a, b) => (a.date > b.date) ? 1 : -1));

  }
  findAllPersonal(): Task[]{
    return this.personalTask;
  }
  findAllGeneral(): Task[]{
    return this.tasks;
  }
  RowSelected(i){
    this.selectedtask = this.tasks[i];
    this.current = i;
    this.isSelected = true;
  }
  Save(task: Task){
    let a = true;
    for(let i = 0 ; i < this.tasks.length; i++ )
    {
      if(this.tasks[i].id === task.id)
      {
        this.tasks[i] = task;
        a = false;
      }
    }
    if(a){
      for(let i = 0 ; i < this.personalTask.length; i++ )
      {
        if(this.personalTask[i].id === task.id)
        {
          this.personalTask[i] = task;
          a = true;
        }
      }
    }
  }
  findById(oId: number): Task{
    // for (let i = 0 ; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id === oId) {
    //     return this.test = this.tasks[i];
    //   }
    // }
    // console.log('I didnt find you :(');
    // return null;
    for (let i = 0 ; i < this.findAll().length; i++) {
      if (this.findAll()[i].id === oId) {
        return this.test = this.findAll()[i];
      }
    }
    console.log('I didnt find you :(');
    return null;
  }
  deleteById(oId: number) {
  //   if (this.findById(oId)){
  //     this.tasks.splice(this.current, 1);
  //     this.isSelected = false;
  //     console.log('deleeteeeed !!!!!!!!');
  //   }
  //   else {
  //
  //     console.log('cant deleted !!!!!!!!');
  //      }
  // }
    if (this.findById(oId)){
      // this.findAll().splice(this.findAll().indexOf(this.findById(oId)), 1);
      this.isSelected = false;
      if(this.personalTask.includes(this.findById(oId))){
        console.log('I am in the personal task list');
        this.personalTask.splice(this.personalTask.indexOf(this.findById(oId)), 1);
        this.findAll().splice(this.findAll().indexOf(this.findById(oId)), 1);
      }
      if(this.tasks.includes(this.findById(oId))){
        console.log('I am in the general task list');
        this.tasks.splice(this.tasks.indexOf(this.findById(oId)), 1);
        this.findAll().splice(this.findAll().indexOf(this.findById(oId)), 1);
      }
      console.log('deleeteeeed !!!!!!!!');
    }
    else {

      console.log('cant deleted !!!!!!!!');
    }
  }
}
