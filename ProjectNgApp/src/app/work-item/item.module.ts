import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//routing module
import { ItemRoutingModule } from './item-routing.module';

//components
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIModule,
    FormsModule,
    ItemRoutingModule,
    AgGridModule.withComponents([]),
    NgbAlertModule,
    NgbModule
  ]
})
export class ItemModule {}
