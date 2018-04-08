import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroPage } from './hero';
import {MarkdownModule} from "ngx-markdown";
import {ElasticModule} from "angular2-elastic";
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    HeroPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroPage),
    MomentModule,
    MarkdownModule.forChild(),
    ElasticModule,
    SimplemdeModule,
  ],
  exports: [
    HeroPage
  ]
})
export class HeroPageModule {}
