import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ScopedDatePickerComponent } from './scoped-date-picker';
import {ScopedDateComponentModule} from "../scoped-date/scoped-date.module";
import {MomentModule} from "ngx-moment";

@NgModule({
  declarations: [
    ScopedDatePickerComponent,
  ],
  imports: [
    IonicModule,
    ScopedDateComponentModule,
    MomentModule
  ],
  exports: [
    ScopedDatePickerComponent
  ]
})
export class ScopedDatePickerComponentModule {}
