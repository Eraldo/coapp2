import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackendPage } from './backend';

@NgModule({
  declarations: [
    BackendPage,
  ],
  imports: [
    IonicPageModule.forChild(BackendPage),
  ],
  exports: [
    BackendPage
  ]
})
export class BackendPageModule {}
