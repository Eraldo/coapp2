import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextModalPage } from './text-modal';
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    TextModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TextModalPage),
    SimplemdeModule,
  ],
})
export class TextModalPageModule {}
