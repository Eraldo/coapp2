import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    AppToolbarComponentModule,
  ],
  exports: [
    ShopPage
  ]
})
export class ShopPageModule {}
