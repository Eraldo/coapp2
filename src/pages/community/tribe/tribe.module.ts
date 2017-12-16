import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { TribePage } from './tribe';
import {TribeUserItemComponentModule} from "./tribe-user-item/tribe-user-item.module";

@NgModule({
  declarations: [
    TribePage,
  ],
  imports: [
    IonicPageModule.forChild(TribePage),
    TribeUserItemComponentModule
  ],
  exports: [
    TribePage
  ]
})
export class TribePageModule {}
