import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import {GemsComponentModule} from "../../../components/gems/gems.module";

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    GemsComponentModule,
  ],
  exports: [
    ShopPage
  ]
})
export class ShopPageModule {}
