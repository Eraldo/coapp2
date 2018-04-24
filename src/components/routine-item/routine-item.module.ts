import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RoutineItemComponent} from "./routine-item";

@NgModule({
  declarations: [
    RoutineItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(RoutineItemComponent),
  ],
  exports: [
    RoutineItemComponent
  ]
})
export class RoutineItemComponentModule {}
