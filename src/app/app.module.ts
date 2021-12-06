import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { FilesComponent } from './components/files/files.component';
import { TimerComponent } from './components/tasks/timer/timer.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AddUserComponent,
    UpdateUserComponent,
    TasksComponent,
    LoadingSpinnerComponent,
    UserProfileComponent,
    PerformanceComponent,
    FilesComponent,
    TimerComponent,
    CustomDatePipe,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
