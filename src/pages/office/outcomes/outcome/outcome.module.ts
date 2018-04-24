import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OutcomePage} from './outcome';
import {MomentModule} from "ngx-moment";
import {MarkdownModule} from "ngx-markdown";
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";
import {TagComponentModule} from "../../../../components/tag/tag.module";
import {ProgressBarComponentModule} from "../../../../components/progress-bar/progress-bar.module";

@NgModule({
  declarations: [
    OutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomePage),
    OutcomeComponentModule,
    MomentModule,
    MarkdownModule.forChild(),
    TagComponentModule,
    ProgressBarComponentModule
  ],
  exports: [
    OutcomePage
  ]
})
export class OutcomePageModule {
}
