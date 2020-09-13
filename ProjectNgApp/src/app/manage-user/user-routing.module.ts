import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user/add-user.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-user/:id', component: AddUserComponent },
  { path: 'users-list', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
