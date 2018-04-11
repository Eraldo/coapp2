import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiModalPage } from './emoji-modal';
import {PickerModule} from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    EmojiModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EmojiModalPage),
    PickerModule
  ],
})
export class EmojiModalPageModule {}
