import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendPage } from './legend';
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    LegendPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendPage),
    MomentModule,
  ],
  exports: [
    LegendPage
  ]
})
export class LegendPageModule {}
