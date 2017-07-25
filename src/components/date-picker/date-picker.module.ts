import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DatePickerComponent } from './date-picker';
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    DatePickerComponent,
  ],
  imports: [
    IonicModule,
    MomentModule,
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerComponentModule {}
