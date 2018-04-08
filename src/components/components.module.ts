import { NgModule } from '@angular/core';
import {MarkdownModule} from "ngx-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';
import { StarRatingComponent } from './star-rating/star-rating';

@NgModule({
	declarations: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
  ],
	imports: [
	  IonicModule,
    MarkdownModule.forChild(),
  ],
	exports: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
  ]
})
export class ComponentsModule {}
