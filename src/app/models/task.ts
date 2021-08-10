export class Task {
  static count = 0;
  id: number;
  title: string;
  description: string;
  status: Taskstatus;
  priority: boolean;
  date: Date;
  checked: boolean;
  username: string;
  madeBy: string;
  personalTask: boolean;
  restaurant: string;
  file_name: string;

  constructor()
  constructor(id: number, title: string, description: string, status: Taskstatus,
              priority: boolean, date: Date, checked: boolean, username: string, madeby: string,
              personalTask: boolean, restaurant: string, file_name: string)
  constructor(id?: number, title?: string, description?: string, status?: Taskstatus,
              priority?: boolean, date?: Date, checked?: boolean, username?: string, madeby?: string,
              personalTask?: boolean, restaurant?: string, file_name?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.checked = checked;
    this.username = username;
    this.madeBy = madeby;
    this.personalTask = personalTask;
    this.restaurant = restaurant;
    this.file_name = file_name;
  }
  // static createRandomTask(): Task {
  //   const id = this.count + 2;
  //   const title = 'task ' + this.count;
  //   const description = 'Description ' + this.count;
  //   const status = Taskstatus.TODO;
  //   const priority = false;
  //   const date = null;
  //   this.count++;
  //
  //   return new Task(id, title, description, status, priority, date);
  // }
  public equals(t: Task): boolean{
    return this.title === t.title &&
      this.status === t.status &&
      this.description  === t.description  &&
      this.priority === t.priority &&
      this.date === t.date &&
      this.id === t.id;
  }


  setFile(value: string) {
    this.file_name = value;
  }
}
// export erbij gezet nu kun je het ook in andere classes gebruiken
export enum Taskstatus {
  DONE = 'DONE',
  TODO = 'TODO'
}
