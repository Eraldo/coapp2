import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeSelectPage } from './outcome-select';
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";

@NgModule({
  declarations: [
    OutcomeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeSelectPage),
    OutcomeComponentModule,
  ],
  exports: [
    OutcomeSelectPage
  ]
})
export class OutcomeSelectPageModule {}
