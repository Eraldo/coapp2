import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusFormPage } from './focus-form';
import {OutcomeInputComponentModule} from "../../../../components/outcome-input/outcome-input.module";
import {ElasticModule} from "angular2-elastic";

@NgModule({
  declarations: [
    FocusFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusFormPage),
    OutcomeInputComponentModule,
    ElasticModule
  ],
  exports: [
    FocusFormPage
  ]
})
export class FocusFormPageModule {}
