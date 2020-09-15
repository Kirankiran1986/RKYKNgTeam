import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  { path: 'items-list', component: ItemComponent },
  { path: 'items-details/:id', component: ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
