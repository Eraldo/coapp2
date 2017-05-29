import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrologueMockupPage } from './prologue-mockup';

@NgModule({
  declarations: [
    PrologueMockupPage,
  ],
  imports: [
    IonicPageModule.forChild(PrologueMockupPage),
  ],
  exports: [
    PrologueMockupPage
  ]
})
export class PrologueMockupPageModule {}
