import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonaltaskComponent} from './personaltask.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {TaskserviceSbService} from '../../../services/taskservice-sb.service';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {defer, Observable, observable, of} from 'rxjs';
import {Task, Taskstatus} from '../../../models/task';
import {element} from 'protractor';

// const todosServiceStub = {
//   get() {
//     const todos = [{id: 1}];
//     return of( todos );
//   }
// };
export class DataStub {

  // public get(url: string): Observable<Task[]> {
  //   return Observable.of(testData);
  // }
  // ...
}


const taskService = {
  GetTaskByid() {
    const dummyTask = [{ id: 1 , title: 'TEST5', description: '', status: 'TODO', date: '2020-12-10', priority: 0, checked: '0'
      , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: null}];
    return of( dummyTask);
  }
};

// const dummyTaskList = [
//   { id: 1 , title: 'TEST5', description: '', status: 'TODO', date: '2020-12-10', priority: 0, checked: '0'
//     , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: null},
//   { id: 2, title: 'TEST123', description: 'TEST123', status: 'DONE', date: '2020-13-10', priority: 0, checked: '1'
//     , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: 'task_img_56'},
//   { id: 3, title: 'TEST4', description: '', status: 'DONE', date: '2020-14-10', priority: 1, checked: '0'
//     , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 0, restaurant: 'Spaghetteria Van Woustraat', file_name: null},
//   { id: 4, title: 'TEST4', description: '', status: 'DONE', date: '2020-14-10', priority: 1, checked: '0'
//     , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 0, restaurant: 'Spaghetteria Van Woustraat', file_name: null},
// ];

describe('PersonaltaskComponent', () => {
  let component: PersonaltaskComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<PersonaltaskComponent>;
  let service: TaskserviceSbService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaltaskComponent ],
      imports: [ HttpClientTestingModule,
        HttpClientModule,
        CookieModule.forRoot(),
        FormsModule
      ],
      providers: [{provide: TaskserviceSbService, useValue: taskService}],
    })
    .compileComponents();
    service = TestBed.inject(TaskserviceSbService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ HttpClientTestingModule,
  //       HttpClientModule,
  //       CookieModule.forRoot()
  //     ]
  //   });
  //   service = TestBed.inject(TaskserviceSbService);
  //   httpMock = TestBed.inject(HttpTestingController);
  // });


  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaltaskComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should have one row', () => {

    const dummyTaskListResponse = [
      { id: 1 , title: 'TEST5', description: '', status: 'TODO', date: '2020-12-10', priority: 0, checked: '0'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: null},
      { id: 2, title: 'TEST123', description: 'TEST123', status: 'DONE', date: '2020-13-10', priority: 0, checked: '1'
        , username: 'test@test.nl', madeby: 'test@test.nl', personal_task: 1, restaurant: 'Spaghetteria Korte Koestraat', file_name: 'task_img_56'},
    ];

    service.GetPersotasks('test@test.nl').subscribe( (res: Task[]) => {
      expect(res[0].username).toEqual('test@test.nl');
    });
    const req = httpMock.expectOne(

      service.API_NAME + 'tasks/perso?username=test@test.nl');

    expect(req.request.method).toBe('GET');

    fixture.detectChanges();
    expect(componentHtml.querySelectorAll('.tr').length).toEqual(1);
    req.flush(dummyTaskListResponse);
  });

  // xit('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it( 'Example 01: search input should update component property)',  () => {
  //
  //   // Arrange (getting UI components)
  //   // const addButton: HTMLButtonElement = componentHtml.querySelector('#addButton');
  //   const addButton: HTMLButtonElement = componentHtml.querySelector('#onAdd');
  //   const table: HTMLTableElement = componentHtml.querySelector('#dev-table');
  //   const titleInput: HTMLInputElement = componentHtml.querySelector('#ftitel1');
  //   const dateInput: HTMLInputElement = componentHtml.querySelector('#dateS');
  //   const priorityInput: HTMLInputElement = componentHtml.querySelector('#priority');
  //   const descriptionArea: HTMLInputElement = componentHtml.querySelector('#form79textarea');
  //
  //
  //   const previous: number = component.tasks.length;
  //
  //   // const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
  //   // const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');
  //
  //   // // Act: Performing search
  //   // searchInput.value = 'Wibautstraat, 2, Amsterdam';
  //   // searchInput.dispatchEvent(new Event('input'));
  //   // fixture.detectChanges(); // Angular should be updated
  //
  //   // Act: Preforming add task
  //   titleInput.value = 'testingTask';
  //   titleInput.dispatchEvent(new Event('input'));
  //   dateInput.value = '2021-01-19';
  //   dateInput.dispatchEvent(new Event('input'));
  //   priorityInput.checked = true;
  //   priorityInput.dispatchEvent(new Event('input'));
  //   descriptionArea.value = 'Lorum Ipsum';
  //   descriptionArea.dispatchEvent(new Event('input'));
  //
  //   // const locationService = fixture.debugElement.injector.get(LocationService);
  //   // const spy = spyOn(locationService, 'getAddressInfo').and.callThrough();
  //   const taskService = fixture.debugElement.injector.get(TaskserviceSbService);
  //   const spy = spyOn(taskService, 'PostTask').and.callThrough();
  //
  //
  //   addButton.click();
  //   fixture.detectChanges();
  //   //expect(component.newtask.description).toEqual(descriptionArea.value);
  //   fixture.detectChanges(); // Angular should be updated
  //
  //
  //
  //   // Assert: Check if the property was updated
  //   spy.calls.mostRecent().returnValue.subscribe(() => {
  //     fixture.detectChanges();
  //     const resultTable: HTMLTableElement = componentHtml.querySelector('#dev-table');
  //     expect(resultTable.innerText).toContain('testingTask');
  //   });
  //
  //
  //     // expect(component.tasks).toBeGreaterThan(previous);
  // });

  // it('should click plus', () => {
  //   const addButton: HTMLButtonElement = componentHtml.querySelector('#addButton');
  //
  //
  //   spyOn(component, 'findingTask');
  //   let el = fixture.debugElement.query(By.css('td')).nativeElement.click();
  //   expect(component.findingTask).toHaveBeenCalled();
  // });


  //   // Assert: Check if the property was updated
  //   spy.calls.mostRecent().returnValue.subscribe(() => {
  //     fixture.detectChanges();
  //     const resultTable: HTMLTableElement = componentHtml.querySelector('#dev-table');
  //     expect(resultTable.innerText).toContain('testingTask');
  //   });
  // it('should display the modal when `create Paste` is clicked', (done) => {
  //   const id = 211;
  //   let task = new Task(211, 'bar reiniging', '', Taskstatus.TODO, true, new Date('2021-01-20'), false
  //     , 'admin@aming.nl', '', true, 'Restaurant test', null);
  //
  //   //   , true, '2021-01-15', true, 'admin@admin.nl'
  //   //   , null, true, 'Spaghetteria Nieuwe Binnenweg', null);
  //   const createPasteButton = fixture.debugElement.query(By.css('#addButton'));
  //   const result: string = componentHtml.textContent;
  //   const resultDiv: HTMLDivElement = componentHtml.querySelector('#pModal');
  //   const serviceTask = fixture.debugElement.injector.get(TaskserviceSbService);
  //   const spy = spyOn(serviceTask, 'GetTaskByid').and.returnValue(of(observable(task)));
  //
  //
  //   // triggerEventHandler simulates a click event on the button object
  //   createPasteButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //  // expect(result).toContain('Datum');
  //   // const spy = spyOn(component, 'findingTask').and.callThrough();
  //
  //   spy.calls.mostRecent().returnValue.subscribe(() => {
  //         fixture.detectChanges();
  //         expect(resultDiv).toHaveBeenCalled();
  //         done();
  //   });
  //
  // });

  // it('should display the modal when `create Paste` is clicked', () => {
  //
  //   let createPasteButton = fixture.debugElement.query(By.css("button"));
  //   //triggerEventHandler simulates a click event on the button object
  //   createPasteButton.triggerEventHandler('click',null);
  //   fixture.detectChanges();
  //   expect(element.innerHTML).toContain("source-modal");
  //
  // })
  //
  // it('should test click', () => {
  //   spyOn(component, 'findingTask');
  //   let el = fixture.debugElement.query(By.css('td')).nativeElement.click();
  //   expect(component.findingTask).toHaveBeenCalled();
  // });
  //
  // it('should test selected', () => {
  //   let el = fixture.debugElement.query(By.css('td')).nativeElement;
  //   expect(el.classList.has('selected')).toBe(false);
  //
  //   component.findingTask(0);
  //   expect(el.classList.has('selected')).toBe(true);
  // });
  // it('should display the modal when `create Paste` is clicked', (done) => {
  //   const createPasteButton = fixture.debugElement.query(By.css('fa fa-plus'));
  //   createPasteButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(element.all).toContain('pModal');
  //   done();
  // });
});
