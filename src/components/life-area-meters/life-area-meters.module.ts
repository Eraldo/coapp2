import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RoundProgressModule} from "angular-svg-round-progressbar";
import {LifeAreaMetersComponent} from "./life-area-meters";

@NgModule({
  declarations: [
    LifeAreaMetersComponent,
  ],
  imports: [
    IonicPageModule.forChild(LifeAreaMetersComponent),
    RoundProgressModule
  ],
  exports: [
    LifeAreaMetersComponent
  ]
})
export class LifeAreaMetersComponentModule {}
