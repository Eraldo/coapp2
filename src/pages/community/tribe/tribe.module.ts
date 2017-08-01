import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { TribePage } from './tribe';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {TribeUserItemComponentModule} from "./tribe-user-item/tribe-user-item.module";

@NgModule({
  declarations: [
    TribePage,
  ],
  imports: [
    IonicPageModule.forChild(TribePage),
    AppToolbarComponentModule,
    TribeUserItemComponentModule
  ],
  exports: [
    TribePage
  ]
})
export class TribePageModule {}
