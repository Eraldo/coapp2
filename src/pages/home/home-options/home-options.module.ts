import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeOptionsPage } from './home-options';

@NgModule({
  declarations: [
    HomeOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeOptionsPage),
  ],
})
export class HomeOptionsPageModule {}
