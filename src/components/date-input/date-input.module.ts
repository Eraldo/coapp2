import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateInputComponent } from './date-input';

@NgModule({
  declarations: [
    DateInputComponent,
  ],
  imports: [
    IonicPageModule.forChild(DateInputComponent),
  ],
  exports: [
    DateInputComponent
  ]
})
export class DateInputComponentModule {}
