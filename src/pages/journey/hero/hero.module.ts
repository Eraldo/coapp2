import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroPage } from './hero';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    HeroPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroPage),
    AppToolbarComponentModule,
  ],
  exports: [
    HeroPage
  ]
})
export class HeroPageModule {}
