import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitPage } from './habit';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    HabitPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitPage),
    MarkdownModule.forChild()
  ],
})
export class HabitPageModule {}
