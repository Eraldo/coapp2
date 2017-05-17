import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeComponent } from './outcome';
import {StatusComponentModule} from "../status/status.module";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    OutcomeComponent,
  ],
  imports: [
    StatusComponentModule,
    IonicPageModule.forChild(OutcomeComponent),
    MomentModule,
  ],
  exports: [
    OutcomeComponent
  ]
})
export class OutcomeComponentModule {}
