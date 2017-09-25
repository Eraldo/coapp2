import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickaddOptionsPage } from './quickadd-options';

@NgModule({
  declarations: [
    QuickaddOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickaddOptionsPage),
  ],
  exports: [
    QuickaddOptionsPage
  ]
})
export class QuickaddOptionsPageModule {}
