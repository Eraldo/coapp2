import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeFormPage } from './outcome-form';
import {DateInputComponentModule} from "../../../../components/date-input/date-input.module";
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    OutcomeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeFormPage),
    DateInputComponentModule,
    SimplemdeModule
  ],
  exports: [
    OutcomeFormPage
  ]
})
export class OutcomeFormPageModule {}
