import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeLogComponent} from './components/home-log/home-log.component';
import {LogComponent} from './components/log/log.component';
import {LoginComponent} from './components/login/login.component';
import {ContactViewComponent} from './components/contactView/contact-view.component';
import {BaseMenuSelectionComponent} from './components/menuSelectionBranch/base-menu-selection/base-menu-selection.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TaskOverviewComponent} from './components/tasks/task-overview/task-overview.component';
import {TaskDetailComponent} from './components/tasks/task-detail/task-detail.component';
import {DishesTMComponent} from './components/menuSelectionTM/dishes-tm/dishes-tm.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {NewLogComponent} from './components/new-log/new-log.component';
import {MessagesComponent} from './components/messages/messages.component';
import {ViewAllLogsComponent} from './components/view-all-logs/view-all-logs.component';
import {UserOverviewComponent} from './components/user-overview/user-overview.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'log', component: LogComponent},
  {path: 'log/:id', component: NewLogComponent},
  {path: 'view-all', component: ViewAllLogsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: BaseMenuSelectionComponent},
  {path: 'menuAdmin', component: DishesTMComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'task', component: TaskDetailComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'user', component: UserOverviewComponent},
  {path: '**', redirectTo: '/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
