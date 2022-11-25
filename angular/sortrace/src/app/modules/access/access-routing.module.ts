import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermanageComponent } from './usermanage/usermanage.component';

const routes: Routes = [
  { path: '', redirectTo: 'usermanage', pathMatch: 'full' },
  { path: 'usermanage', component: UsermanageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
