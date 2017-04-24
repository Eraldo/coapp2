import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { DuoPage } from './duo';

@NgModule({
  declarations: [
    DuoPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoPage),
  ],
  exports: [
    DuoPage
  ]
})
export class DuoPageModule {}
