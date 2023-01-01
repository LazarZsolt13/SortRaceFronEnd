import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { FormsModule } from '@angular/forms';
import { PlayComponent } from './play/play.component';


@NgModule({
  declarations: [
    UsermanageComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    FormsModule,
  ]
})
export class AccessModule { }
