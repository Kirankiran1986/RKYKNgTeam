import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
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
