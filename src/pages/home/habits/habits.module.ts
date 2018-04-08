import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsPage } from './habits';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {MarkdownModule} from "ngx-markdown";
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    HabitsPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsPage),
    MarkdownModule.forChild(),
    SimplemdeModule,
    ScopeComponentModule,
  ],
  exports: [
    HabitsPage
  ]
})
export class HabitsPageModule {}
