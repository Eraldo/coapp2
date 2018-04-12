import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPopoverPage } from './emoji-popover';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";

@NgModule({
  declarations: [
    EmojiPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EmojiPopoverPage),
    PickerModule,
    EmojiModule,
  ],
})
export class EmojiPopoverPageModule {}
