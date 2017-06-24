import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { TribePage } from './tribe';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    TribePage,
  ],
  imports: [
    IonicPageModule.forChild(TribePage),
    AppToolbarComponentModule,
  ],
  exports: [
    TribePage
  ]
})
export class TribePageModule {}
