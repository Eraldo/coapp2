import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusComponent } from './focus';
import {OutcomeComponentModule} from "../outcome/outcome.module";

@NgModule({
  declarations: [
    FocusComponent,
  ],
  imports: [
    IonicPageModule.forChild(FocusComponent),
    OutcomeComponentModule,
  ],
  exports: [
    FocusComponent
  ]
})
export class FocusComponentModule {}
