import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReflectionPage } from './reflection';

@NgModule({
  declarations: [
    ReflectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ReflectionPage),
  ],
  exports: [
    ReflectionPage
  ]
})
export class ReflectionPageModule {}
