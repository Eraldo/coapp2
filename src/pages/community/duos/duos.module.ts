import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuosPage } from './duos';

@NgModule({
  declarations: [
    DuosPage,
  ],
  imports: [
    IonicPageModule.forChild(DuosPage),
  ],
  exports: [
    DuosPage
  ]
})
export class DuosPageModule {}
