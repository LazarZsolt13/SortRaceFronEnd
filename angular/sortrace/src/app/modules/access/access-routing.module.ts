import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { BublesortComponent } from './bublesort/bublesort.component';

const routes: Routes = [
  { path: '', redirectTo: 'usermanage', pathMatch: 'full' },
  { path: 'usermanage', component: UsermanageComponent },
  { path: 'play', component: PlayComponent },
  { path: 'bublesort', component: BublesortComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
