import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ScopedDatePickerComponent } from './scoped-date-picker';
import {ScopedDateComponentModule} from "../scoped-date/scoped-date.module";

@NgModule({
  declarations: [
    ScopedDatePickerComponent,
  ],
  imports: [
    IonicModule,
    ScopedDateComponentModule
  ],
  exports: [
    ScopedDatePickerComponent
  ]
})
export class ScopedDatePickerComponentModule {}
