import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroPage } from './hero';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {MarkdownModule} from "angular2-markdown";
import {ElasticModule} from "angular2-elastic";
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    HeroPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroPage),
    AppToolbarComponentModule,
    MomentModule,
    MarkdownModule,
    ElasticModule,
    SimplemdeModule,
  ],
  exports: [
    HeroPage
  ]
})
export class HeroPageModule {}
