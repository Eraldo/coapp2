import { NgModule } from '@angular/core';
import {MarkdownModule} from "ngx-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';
import { StarRatingComponent } from './star-rating/star-rating';
import { EmbeddedVideoComponent } from './embedded-video/embedded-video';

@NgModule({
	declarations: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
    EmbeddedVideoComponent,
  ],
	imports: [
	  IonicModule,
    MarkdownModule.forChild(),
  ],
	exports: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
    EmbeddedVideoComponent,
  ]
})
export class ComponentsModule {}
