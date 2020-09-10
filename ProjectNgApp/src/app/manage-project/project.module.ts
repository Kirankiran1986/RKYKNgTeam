import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//routing module
import { ProjectRoutingModule } from './project-routing.module';

//components
import { ProjectComponent } from './projects/project.component';

@NgModule({
    declarations: [ProjectComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      UIModule,    
      ProjectRoutingModule,
      AgGridModule.withComponents([]),
      NgbAlertModule,
      NgbModule
    ]
  })
  export class ProjectModule {}