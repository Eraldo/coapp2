import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMetaPage } from './home-meta';

@NgModule({
  declarations: [
    HomeMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMetaPage),
  ],
  exports: [
    HomeMetaPage
  ]
})
export class HomeMetaPageModule {}
