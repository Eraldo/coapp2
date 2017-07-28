import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClansPage } from './clans';

@NgModule({
  declarations: [
    ClansPage,
  ],
  imports: [
    IonicPageModule.forChild(ClansPage),
  ],
  exports: [
    ClansPage
  ]
})
export class ClansPageModule {}
