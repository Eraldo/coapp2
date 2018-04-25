import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitPage } from './habit';
import {MarkdownModule} from "ngx-markdown";
import {MomentModule} from "ngx-moment";
import {RoutineItemComponentModule} from "../../../../components/routine-item/routine-item.module";
import {HabitItemComponentModule} from "../../../../components/habit-item/habit-item.module";

@NgModule({
  declarations: [
    HabitPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitPage),
    MarkdownModule.forChild(),
    MomentModule,
    HabitItemComponentModule,
    RoutineItemComponentModule
  ],
})
export class HabitPageModule {}
