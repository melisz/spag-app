import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {TaskOverviewComponent} from './components/tasks/task-overview/task-overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import {LoginComponent} from './components/login/login.component';
import {ContactViewComponent} from './components/contactView/contact-view.component';
import {ContactDetailComponent} from './components/contactDetail/contact-detail.component';
import {HomeLogComponent} from './components/home-log/home-log.component';
import {HttpClientModule} from '@angular/common/http';
import {LogComponent} from './components/log/log.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TaskDetailComponent} from './components/tasks/task-detail/task-detail.component';
import {IngredientsTableComponent} from './components/menuSelectionBranch/ingredients-table/ingredients-table.component';
import {DrinksTableComponent} from './components/menuSelectionBranch/drinks-table/drinks-table.component';
import {DishDetailComponent} from './components/menuSelectionBranch/dish-detail/dish-detail.component';
import {BaseMenuSelectionComponent} from './components/menuSelectionBranch/base-menu-selection/base-menu-selection.component';
import {DishTableComponent} from './components/menuSelectionBranch/dish-table/dish-table.component';
import {DishesTMComponent} from './components/menuSelectionTM/dishes-tm/dishes-tm.component';
import {DishesTmDetailComponent} from './components/menuSelectionTM/dishes-tm-detail/dishes-tm-detail.component';
import {DrinksTmComponent} from './components/menuSelectionTM/drinks-tm/drinks-tm.component';
import {DrinksTmDetailComponent} from './components/menuSelectionTM/drinks-tm-detail/drinks-tm-detail.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {AddContactComponent} from './components/add-contact/add-contact.component';
import {PersonaltaskComponent} from './components/tasks/personaltask/personaltask.component';
import {NewDishComponent} from './components/menuSelectionTM/new-dish/new-dish.component';
import {NewLogComponent} from './components/new-log/new-log.component';
import {HomeNotificationComponent} from './components/home-notification/home-notification.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {NgxPaginationModule} from 'ngx-pagination';
import {MessagesComponent} from './components/messages/messages.component';
import {HeaderComponent} from './components/header/header.component';
import {MessagesDetails} from './details/messages/messages.details';
import {InvokeDirective} from 'src/app/details/messages/InvokeDirective';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {ViewAllLogsComponent} from './components/view-all-logs/view-all-logs.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { MenuSelectionComponent } from './components/menuSelectionBranch/menu-selection/menu-selection.component';
import { GenerateMenuComponent } from './components/menuSelectionBranch/generate-menu/generate-menu.component';
import { CheckedTaskComponent } from './components/tasks/checked-task/checked-task.component';

import {ButtonsModule} from 'ngx-bootstrap/buttons';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TaskOverviewComponent,
    LoginComponent,
    ContactViewComponent,
    ContactDetailComponent,
    HomeLogComponent,
    LogComponent,
    DashboardComponent,
    HeaderComponent,
    MessagesComponent,
    MessagesDetails,
    IngredientsTableComponent,
    DrinksTableComponent,
    DishDetailComponent,
    BaseMenuSelectionComponent,
    DishTableComponent,
    TaskDetailComponent,
    DishesTMComponent,
    DishesTmDetailComponent,
    DrinksTmComponent,
    DrinksTmDetailComponent,
    ContactPageComponent,
    AddContactComponent,
    PersonaltaskComponent,
    NewDishComponent,
    NewLogComponent,
    HomeNotificationComponent,
    InvokeDirective,
    ViewAllLogsComponent,
    CheckedTaskComponent,
    UserOverviewComponent,
    MenuSelectionComponent,
    GenerateMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    SwiperModule,
    CarouselModule,
    ButtonsModule,
    NgbModule,
  ],

  providers: [CookieModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
