import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListproductComponent } from './listproduct/listproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
//import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: 'listproduct', component: ListproductComponent },
  { path: 'addproduct', component: AddproductComponent },
  //{ path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  //{ path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  //{ path: 'other', loadChildren: () => import('./other/other.module').then(m => m.OtherModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
