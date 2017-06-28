import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OutcomesComponent} from "./outcomes";
import {OutcomeComponentModule} from "../outcome/outcome.module";

@NgModule({
  declarations: [
    OutcomesComponent,
  ],
  imports: [
    IonicPageModule.forChild(OutcomesComponent),
    OutcomeComponentModule,
  ],
  exports: [
    OutcomesComponent
  ]
})
export class OutcomesComponentModule {}
