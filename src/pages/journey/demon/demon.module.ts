import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemonPage } from './demon';

@NgModule({
  declarations: [
    DemonPage,
  ],
  imports: [
    IonicPageModule.forChild(DemonPage),
  ],
  exports: [
    DemonPage
  ]
})
export class DemonPageModule {}
