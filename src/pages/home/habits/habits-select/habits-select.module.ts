import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsSelectPage } from './habits-select';

@NgModule({
  declarations: [
    HabitsSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsSelectPage),
  ],
})
export class HabitsSelectPageModule {}
