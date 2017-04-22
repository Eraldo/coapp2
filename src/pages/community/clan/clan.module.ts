import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { ClanPage } from './clan';

@NgModule({
  declarations: [
    ClanPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanPage),
  ],
  exports: [
    ClanPage
  ]
})
export class ClanPageModule {}
