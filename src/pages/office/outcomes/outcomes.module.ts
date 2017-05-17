import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomesPage } from './outcomes';
import {OutcomeComponentModule} from "../../../components/outcome/outcome.module";

@NgModule({
  declarations: [
    OutcomesPage,
  ],
  imports: [
    OutcomeComponentModule,
    IonicPageModule.forChild(OutcomesPage),
  ],
  exports: [
    OutcomesPage
  ]
})
export class OutcomesPageModule {}
