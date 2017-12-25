import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemonPage } from './demon';
import {MomentModule} from "angular2-moment";
import {MarkdownModule} from "ngx-md";
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    DemonPage,
  ],
  imports: [
    IonicPageModule.forChild(DemonPage),
    MomentModule,
    MarkdownModule,
    SimplemdeModule,
  ],
  exports: [
    DemonPage
  ]
})
export class DemonPageModule {}
