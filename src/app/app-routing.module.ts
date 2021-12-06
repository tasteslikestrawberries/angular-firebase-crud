import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { FilesComponent } from './components/files/files.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'files', component: FilesComponent },
  { path: 'performance', component: PerformanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
