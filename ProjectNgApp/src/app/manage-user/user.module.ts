import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//routing module
import { UserRoutingModule } from './user-routing.module';

//components
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user/add-user.component';
import { ViewActionButtonCellTemplate } from './users/cell-templates/view-action-button-cell-template';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, ViewActionButtonCellTemplate],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UserRoutingModule,
    AgGridModule.withComponents([ViewActionButtonCellTemplate]),
    NgbAlertModule,
    NgbModule
  ]
})
export class UserModule { }
