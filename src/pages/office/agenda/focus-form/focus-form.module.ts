import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusFormPage } from './focus-form';
import {OutcomeInputComponentModule} from "../../../../components/outcome-input/outcome-input.module";

@NgModule({
  declarations: [
    FocusFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusFormPage),
    OutcomeInputComponentModule,
  ],
  exports: [
    FocusFormPage
  ]
})
export class FocusFormPageModule {}
