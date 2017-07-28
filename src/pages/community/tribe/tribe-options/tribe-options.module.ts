import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TribeOptionsPage } from './tribe-options';

@NgModule({
  declarations: [
    TribeOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TribeOptionsPage),
  ],
  exports: [
    TribeOptionsPage
  ]
})
export class TribeOptionsPageModule {}
