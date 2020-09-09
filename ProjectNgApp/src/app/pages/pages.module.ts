import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ListprojectComponent } from './project/listproject/listproject.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListprojectComponent, AddprojectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    //NgApexchartsModule,
    //FlatpickrModule.forRoot(),
    UIModule,
    //WidgetModule,
    PagesRoutingModule,
    //UiModule,
    //AppsModule,
    //OtherModule
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbModule
  ]
})
export class PagesModule { }
