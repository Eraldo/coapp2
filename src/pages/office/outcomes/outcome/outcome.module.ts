import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomePage } from './outcome';
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    OutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomePage),
    OutcomeComponentModule,
    MomentModule,
  ],
  exports: [
    OutcomePage
  ]
})
export class OutcomePageModule {}
