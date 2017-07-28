import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeFormPage } from './outcome-form';
import {DateInputComponentModule} from "../../../../components/date-input/date-input.module";

@NgModule({
  declarations: [
    OutcomeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeFormPage),
    DateInputComponentModule,
  ],
  exports: [
    OutcomeFormPage
  ]
})
export class OutcomeFormPageModule {}
