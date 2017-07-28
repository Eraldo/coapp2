import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TribesPage } from './tribes';

@NgModule({
  declarations: [
    TribesPage,
  ],
  imports: [
    IonicPageModule.forChild(TribesPage),
  ],
  exports: [
    TribesPage
  ]
})
export class TribesPageModule {}
