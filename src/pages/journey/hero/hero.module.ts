import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroPage } from './hero';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {MarkdownModule} from "angular2-markdown";
import {ElasticModule} from "angular2-elastic";

@NgModule({
  declarations: [
    HeroPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroPage),
    AppToolbarComponentModule,
    MarkdownModule,
    ElasticModule
  ],
  exports: [
    HeroPage
  ]
})
export class HeroPageModule {}
