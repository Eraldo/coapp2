import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutinePage } from './routine';
import {MarkdownModule} from "ngx-markdown";
import {HabitItemComponentModule} from "../../../../components/habit-item/habit-item.module";

@NgModule({
  declarations: [
    RoutinePage,
  ],
  imports: [
    IonicPageModule.forChild(RoutinePage),
    MarkdownModule.forChild(),
    HabitItemComponentModule
  ],
})
export class RoutinePageModule {}
