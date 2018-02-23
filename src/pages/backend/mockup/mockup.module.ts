import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MockupPage } from './mockup';

@NgModule({
  declarations: [
    MockupPage,
  ],
  imports: [
    IonicPageModule.forChild(MockupPage),
  ],
  exports: [
    MockupPage
  ]
})
export class MockupPageModule {}
