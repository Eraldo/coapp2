import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ScopedDatePickerComponent } from './scoped-date-picker';
import {DatePickerComponentModule} from "../date-picker/date-picker.module";

@NgModule({
  declarations: [
    ScopedDatePickerComponent,
  ],
  imports: [
    IonicModule,
    DatePickerComponentModule,
  ],
  exports: [
    ScopedDatePickerComponent
  ]
})
export class ScopedDatePickerComponentModule {}
