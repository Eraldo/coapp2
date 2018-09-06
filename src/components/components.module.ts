import { NgModule } from '@angular/core';
import {MarkdownModule} from "ngx-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';
import { StarRatingComponent } from './star-rating/star-rating';
import { EmbeddedVideoComponent } from './embedded-video/embedded-video';
import { JournalEntryItemComponent } from './journal-entry-item/journal-entry-item';
import { HabitItemComponent } from './habit-item/habit-item';
import { RoutineItemComponent } from './routine-item/routine-item';
import { RoleItemComponent } from './role-item/role-item';
import { GemsComponent } from './gems/gems';
import { UnderConstructionItemComponent } from './under-construction-item/under-construction-item';

@NgModule({
	declarations: [
	  LifeAreaMetersComponent,
    StarRatingComponent,
    EmbeddedVideoComponent,
    JournalEntryItemComponent,
    HabitItemComponent,
    RoutineItemComponent,
    RoleItemComponent,
    GemsComponent,
    UnderConstructionItemComponent,
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
    HabitItemComponent,
    RoutineItemComponent,
    RoleItemComponent,
    GemsComponent,
    UnderConstructionItemComponent,
  ]
})
export class ComponentsModule {}
