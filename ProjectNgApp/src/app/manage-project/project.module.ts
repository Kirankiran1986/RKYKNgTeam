import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbAlertModule,NgbModule,NgbTypeaheadModule  } from '@ng-bootstrap/ng-bootstrap';

//routing module
import { ProjectRoutingModule } from './project-routing.module';

//components
import { ProjectComponent } from './projects/project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';

@NgModule({
    declarations: [ProjectComponent, ProjectDetailsComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      UIModule,    
      ProjectRoutingModule,
      AgGridModule.withComponents([]),
      NgbAlertModule,
      NgbModule,
      NgbTypeaheadModule
    ]
  })
  export class ProjectModule {}