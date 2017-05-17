import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusComponent } from './status';

@NgModule({
  declarations: [
    StatusComponent,
  ],
  imports: [
    IonicPageModule.forChild(StatusComponent),
  ],
  exports: [
    StatusComponent
  ]
})
export class StatusComponentModule {}
