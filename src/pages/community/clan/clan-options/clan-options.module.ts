import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClanOptionsPage } from './clan-options';

@NgModule({
  declarations: [
    ClanOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanOptionsPage),
  ],
  exports: [
    ClanOptionsPage
  ]
})
export class ClanOptionsPageModule {}
