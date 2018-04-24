import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsPage } from './habits';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {MarkdownModule} from "ngx-markdown";
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {HabitItemComponentModule} from "../../../components/habit-item/habit-item.module";
import {RoutineItemComponentModule} from "../../../components/routine-item/routine-item.module";

@NgModule({
  declarations: [
    HabitsPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsPage),
    MarkdownModule.forChild(),
    SimplemdeModule,
    ScopeComponentModule,
    HabitItemComponentModule,
    RoutineItemComponentModule
  ],
  exports: [
    HabitsPage
  ]
})
export class HabitsPageModule {}
