import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArcadeOptionsPage } from './arcade-options';

@NgModule({
  declarations: [
    ArcadeOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArcadeOptionsPage),
  ],
})
export class ArcadeOptionsPageModule {}
