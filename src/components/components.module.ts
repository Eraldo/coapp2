import { NgModule } from '@angular/core';
import { ChapterComponent } from './chapter/chapter';
import {MarkdownModule} from "angular2-markdown";
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [ChapterComponent],
	imports: [IonicModule, MarkdownModule],
	exports: [ChapterComponent]
})
export class ComponentsModule {}
