import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuoOptionsPage } from './duo-options';

@NgModule({
  declarations: [
    DuoOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoOptionsPage),
  ],
  exports: [
    DuoOptionsPage
  ]
})
export class DuoOptionsPageModule {}
