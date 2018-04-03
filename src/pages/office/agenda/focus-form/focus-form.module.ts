import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusFormPage } from './focus-form';
import {OutcomeInputComponentModule} from "../../../../components/outcome-input/outcome-input.module";
import {ElasticModule} from "angular2-elastic";
import {ScopedDateComponentModule} from "../../../../components/scoped-date/scoped-date.module";

@NgModule({
  declarations: [
    FocusFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusFormPage),
    OutcomeInputComponentModule,
    ScopedDateComponentModule,
    ElasticModule
  ],
  exports: [
    FocusFormPage
  ]
})
export class FocusFormPageModule {}
