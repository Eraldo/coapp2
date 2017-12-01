import { NgModule } from '@angular/core';
import {MarkdownModule} from "angular2-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';
import { StarRatingComponent } from './star-rating/star-rating';

@NgModule({
	declarations: [
	  LifeAreaMetersComponent,
    StarRatingComponent
  ],
	imports: [
	  IonicModule,
    MarkdownModule
  ],
	exports: [
	  LifeAreaMetersComponent,
    StarRatingComponent
  ]
})
export class ComponentsModule {}
