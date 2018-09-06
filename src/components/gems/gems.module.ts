import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GemsComponent} from "./gems";

@NgModule({
  declarations: [
    GemsComponent,
  ],
  imports: [
    IonicPageModule.forChild(GemsComponent),
  ],
  exports: [
    GemsComponent
  ]
})
export class GemsComponentModule {}
