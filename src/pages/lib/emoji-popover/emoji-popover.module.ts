import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPopoverPage } from './emoji-popover';
import {PickerModule} from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    EmojiPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EmojiPopoverPage),
    PickerModule
  ],
})
export class EmojiPopoverPageModule {}
