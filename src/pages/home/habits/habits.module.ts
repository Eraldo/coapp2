import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsPage } from './habits';

@NgModule({
  declarations: [
    HabitsPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsPage),
  ],
  exports: [
    HabitsPage
  ]
})
export class HabitsPageModule {}
