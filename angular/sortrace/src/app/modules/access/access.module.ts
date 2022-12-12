import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsermanageComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    FormsModule,
  ]
})
export class AccessModule { }
