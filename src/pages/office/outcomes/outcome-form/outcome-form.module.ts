import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomeFormPage } from './outcome-form';

@NgModule({
  declarations: [
    OutcomeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomeFormPage),
  ],
  exports: [
    OutcomeFormPage
  ]
})
export class OutcomeFormPageModule {}
