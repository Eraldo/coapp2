import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StyleguidePage } from './styleguide';

@NgModule({
  declarations: [
    StyleguidePage,
  ],
  imports: [
    IonicPageModule.forChild(StyleguidePage),
  ],
})
export class StyleguidePageModule {}
