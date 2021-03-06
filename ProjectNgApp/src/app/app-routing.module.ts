import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'manage-users',component: LayoutComponent, loadChildren: () => import('./manage-user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: 'manage-project',component: LayoutComponent, loadChildren: () => import('./manage-project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard] },
  { path: 'work-items',component: LayoutComponent, loadChildren: () => import('./work-item/item.module').then(m => m.ItemModule), canActivate: [AuthGuard] },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
