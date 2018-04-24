import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HabitItemComponent} from "./habit-item";

@NgModule({
  declarations: [
    HabitItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(HabitItemComponent),
  ],
  exports: [
    HabitItemComponent
  ]
})
export class HabitItemComponentModule {}
