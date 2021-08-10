import { Task } from './task';
import {message} from './message/message';

export class Notification {

  id: number;
  title: String;
  deadline: Date;
  description: String;
  state: boolean;
  private static _latestId: number;
  type: Type;
  location: string;

  constructor()
  constructor(task: Task, message: message, location: string)
  constructor(task?: Task, message?: message, location?: string) {
    if(message != null) {
      this.id = null;
      this.title = null;
      this.deadline = message.datetimesend;
      this.description = message.message;
      message.isread == true ? this.state = true : this.state = false;
      this.type = Type.mes;
      this.location = location;
    }
    if(task != null) {
      this.id = task.id;
      this.title = task.title;
      this.deadline = task.date;
      this.description = task.description;
      task.status === 'DONE' ? this.state = true : this.state = false;
      this.type = Type.task;
    }
  }

  public static trueCopy(nf: Notification): Notification {
    return nf == null ? null : Object.assign(new Notification(), nf);
  }

  public static trueCopyTask(task: Notification): Task {
    return task == null ? null : Object.assign(new Task(), task);
  }

  public static trueCopyMessage(mes: message): message {
    return mes == null ? null : Object.assign(new message(), message);
  }

  static incrementId() {
    if (!this._latestId) {
      this._latestId = 1;
    } else {
      this._latestId++;
    }
    return this._latestId;
  }

  static randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static datePicker() {
    return new Date(2020, Notification.randomNumber(10, 13), Notification.randomNumber(15, 30),
      Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
  }
}

export enum Type {
  mes = 'mes',
  task ='task'
}
