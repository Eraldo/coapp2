import { NgModule } from '@angular/core';
import {MarkdownModule} from "ngx-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';
import { StarRatingComponent } from './star-rating/star-rating';
import { EmbeddedVideoComponent } from './embedded-video/embedded-video';
import { JournalEntryItemComponent } from './journal-entry-item/journal-entry-item';

@NgModule({
	declarations: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
    EmbeddedVideoComponent,
    JournalEntryItemComponent,
  ],
	imports: [
	  IonicModule,
    MarkdownModule.forChild(),
  ],
	exports: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
    EmbeddedVideoComponent,
    JournalEntryItemComponent,
  ]
})
export class ComponentsModule {}
