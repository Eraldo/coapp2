import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeInputComponent } from './outcome-input';
import {OutcomeComponentModule} from "../outcome/outcome.module";

@NgModule({
  declarations: [
    OutcomeInputComponent,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeInputComponent),
    OutcomeComponentModule,
  ],
  exports: [
    OutcomeInputComponent
  ]
})
export class OutcomeInputComponentModule {}
