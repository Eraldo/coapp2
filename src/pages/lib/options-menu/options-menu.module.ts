import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsMenuPage } from './options-menu';

@NgModule({
  declarations: [
    OptionsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionsMenuPage),
  ],
})
export class OptionsMenuPageModule {}
