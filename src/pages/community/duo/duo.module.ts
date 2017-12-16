import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { DuoPage } from './duo';
import {DuoUserCardComponentModule} from "./duo-user-card/duo-user-card.module";

@NgModule({
  declarations: [
    DuoPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoPage),
    DuoUserCardComponentModule,
  ],
  exports: [
    DuoPage
  ]
})
export class DuoPageModule {}
