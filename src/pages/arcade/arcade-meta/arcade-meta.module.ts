import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArcadeMetaPage } from './arcade-meta';

@NgModule({
  declarations: [
    ArcadeMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(ArcadeMetaPage),
  ],
})
export class ArcadeMetaPageModule {}
