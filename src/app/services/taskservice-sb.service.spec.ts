import {TestBed} from '@angular/core/testing';

import {TaskserviceSbService} from './taskservice-sb.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Task, Taskstatus} from '../models/task';
import {CookieModule} from 'ngx-cookie';
import {HttpClientModule} from '@angular/common/http';
import {Local} from 'protractor/built/driverProviders';

describe('TaskserviceSbService', () => {
  let service: TaskserviceSbService;
  let httpMock: HttpTestingController;







  // it('getUserList() should return data', () => {
  //   service.getUserList().subscribe((res) => {
  //     expect(res).toEqual(dummyUserListResponse);
  //   });
  //
  //   const req = httpMock.expectOne('https://reqres.in/api/users');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyUserListResponse);
  // });


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        HttpClientModule,
        CookieModule.forRoot()
      ]
    });
    service = TestBed.inject(TaskserviceSbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });




  it('should return a task for a given restaurant', () => {
    const dummyTaskListResponse = [
      { id: 1 , title: 'TEST5', description: '', status: 'TODO', date: '2020-12-10', priority: 0, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: null},
      { id: 2, title: 'TEST123', description: 'TEST123', status: 'DONE', date: '2020-13-10', priority: 0, checked: '1'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: 'task_img_56'},
      { id: 3, title: 'TEST4', description: '', status: 'DONE', date: '2020-14-10', priority: 1, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 0, restaurant: 'Spaghetteria Van Woustraat', file_name: null},
      { id: 4, title: 'TEST4', description: '', status: 'DONE', date: '2020-14-10', priority: 1, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 0, restaurant: 'Spaghetteria Van Woustraat', file_name: null},
    ];

    service.GetAlltasks('Spaghetteria Korte Koestraat').subscribe( (res: Task[]) => {
      expect(res[0].restaurant).toEqual('Spaghetteria Korte Koestraat');

    });



    const req = httpMock.expectOne(

      service.API_NAME + 'tasks/allTaskBranche?restaurant=Spaghetteria Korte Koestraat');

    expect(req.request.method).toBe('GET');



    req.flush(dummyTaskListResponse);

  });

  it('should find a task by ID',  () => {
     const task = [
      { id: 211 , title: 'bar reiniging', description: '', status: 'TODO', date: '2021-01-15', priority: 1, checked: 0
        , username: 'admin@admin.nl', madeby: null, personal_task: 0, restaurant: 'Spaghetteria Nieuwe Binnenweg', file_name: null}];
     service.GetTaskByid(211).subscribe((res) => {
      expect(res[0].id).toEqual(211);
      expect(res[0].username).toEqual('admin@admin.nl');
      expect(res[0].file_name).toBeNull();
      expect(res).toEqual(jasmine.arrayContaining(task));

     });
     const req = httpMock.expectOne(service.API_NAME + 'tasks/211');
     expect(req.request.method).toBe('GET');
     req.flush(task);
  });

  it('should add a task by admin',  () => {
    const task = new Task(0, 'bar reiniging', 'testtyyyyyy', Taskstatus.TODO, true, new Date('2021-01-19'), false
      , 'hajar@hajar.nl', null, false, 'Spaghetteria Nieuwe Binnenweg', null);
    const dummyTaskListResponse = [
      { id: 1 , title: 'TEST5', description: '', status: 'TODO', date: '2020-12-10', priority: 0, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: null},
      { id: 2, title: 'TEST123', description: 'TEST123', status: 'DONE', date: '2020-13-10', priority: 0, checked: '1'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: 'task_img_56'},
      { id: 3, title: 'TEST4', description: '', status: 'DONE', date: '2020-14-10', priority: 1, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 0, restaurant: 'Spaghetteria Van Woustraat', file_name: null},
    ];



    service.PostTask(task).subscribe((res) => {
      dummyTaskListResponse.push({ id: res.id, title: res.title, description: res.description, status: res.status, date: '2021-01-19'
        , priority: 1, checked: '0', username: res.username, madeby: res.madeBy, personal_task: 0
        , restaurant: res.restaurant, file_name: res.file_name});
      console.log(service.GetTaskByid(0));
    });
    const req1 = httpMock.expectOne(service.API_NAME + 'tasks');
    expect(req1.request.method).toBe('POST');


    service.GetAlltasks('Spaghetteria Nieuwe Binnenweg').subscribe( (res: Task[]) => {
      expect(res.length).toBe(4);

    });
    const req2 = httpMock.expectOne(service.API_NAME + 'tasks/allTaskBranche?restaurant=Spaghetteria Nieuwe Binnenweg');
    // const req = httpMock.expectOne(service.API_NAME + 'tasks/300');
    expect(req2.request.method).toBe('GET');
    req1.flush(task);
    req2.flush(dummyTaskListResponse);
  });



    // it('should return tasks', fakeAsync(() => {
    //
    //   service.GetAlltasks('Spaghetteria Nieuwe Binnenweg').subscribe((data: Task[]) => {
    //     expect(data).toBe(jasmine.arrayContaining(dummyTaskListResponse));
    //   });
    //   // you can create multiple parameters by appending on same object
    //   let parameters = new HttpParams().append('restaurant', 'heey');
    //
    //   // environment is your base url
    //   const httpReq = new HttpRequest('GET', service.API_NAME + 'tasks/allTaskBranche', {params: parameters});
    //
    //   let tasksRequest = httpMock.expectOne((req: HttpRequest<any>)  =>
    //     req.method === httpReq.method && req.urlWithParams === httpReq.urlWithParams
    //   );
    //
    //   tasksRequest.flush(dummyTaskListResponse);
    //   httpMock.verify();
    // }));


    // it('should find task all task that are TODO',  async () => {
  //   service.GetAllTodo().subscribe((res) => {
  //     expect(res).toEqual(jasmine.arrayWithExactContents(a));
  //     console.log(res);
  //   });
  //
  //   // let results = { param: 'restaurant', value: '50' };
  //   // const req = httpMock.expectOne((request: HttpRequest<any>) => {
  //   //   return request.url === 'localhost:8083/tasks/todo';
  //   // });
  //   // const req = httpMock.expectOne(req => req.url.includes(''));
  //   const req = httpMock.expectOne('localhost:8083/tasks/todo');
  //   // // const req2 = httpMock.expectOne('localhost:8083/tasks/tasks/foradmin');
  //   //
  //   expect(req.request.method).toBe('GET');
  //   req.flush({});
  // });

  // it('should add an employee and return it', () => {
  //   // tslint:disable-next-line:max-line-length
  //   const newTask: Task = { title : 'KaTest', description: 'testyy' , date: null, priority: false, checked: false, username : 'test@test.nl',
  //     personalTask: false , restaurant: 'Spaghetteria Korte Koestraat', file_name: null };
  //
  //   service.PostTask(newTask).subscribe(
  //     data => expect(data).toEqual(newTask, 'should return the employee'),
  //     fail
  //   );
  //
  //   // addEmploye should have made one request to POST employee
  //   const req = httpMock.expectOne(service.API_NAME + 'tasks');
  //   expect(req.request.method).toEqual('POST');
  //   expect(req.request.body).toEqual(newTask);
  //
  //   // Expect server to return the employee after POST
  //   // @ts-ignore
  //   const expectedResponse = new httpMock({ status: 201, statusText: 'Created', body: newTask });
  //   req.event(expectedResponse);
  // });
});
