import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OutcomePage} from './outcome';
import {MomentModule} from "angular2-moment";
import {MarkdownModule} from "ngx-markdown";
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";
import {TagComponentModule} from "../../../../components/tag/tag.module";

@NgModule({
  declarations: [
    OutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomePage),
    OutcomeComponentModule,
    MomentModule,
    MarkdownModule.forChild(),
    TagComponentModule
  ],
  exports: [
    OutcomePage
  ]
})
export class OutcomePageModule {
}
