import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScopedDateComponent } from './scoped-date';
import {MomentModule} from "ngx-moment";

@NgModule({
  declarations: [
    ScopedDateComponent,
  ],
  imports: [
    IonicPageModule.forChild(ScopedDateComponent),
    MomentModule
  ],
  exports: [
    ScopedDateComponent
  ]
})
export class ScopedDateComponentModule {}
