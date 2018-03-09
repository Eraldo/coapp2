import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeMatchPage } from './outcome-match';
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";

@NgModule({
  declarations: [
    OutcomeMatchPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeMatchPage),
    OutcomeComponentModule
  ],
})
export class OutcomeMatchPageModule {}
