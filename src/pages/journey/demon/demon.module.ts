import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemonPage } from './demon';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {MomentModule} from "angular2-moment";
import {MarkdownModule} from "angular2-markdown";
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    DemonPage,
  ],
  imports: [
    IonicPageModule.forChild(DemonPage),
    AppToolbarComponentModule,
    MomentModule,
    MarkdownModule,
    SimplemdeModule,
  ],
  exports: [
    DemonPage
  ]
})
export class DemonPageModule {}
