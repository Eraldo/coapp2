import { NgModule } from '@angular/core';
import {MarkdownModule} from "angular2-markdown";
import {IonicModule} from "ionic-angular";
import { LifeAreaMetersComponent } from './life-area-meters/life-area-meters';

@NgModule({
	declarations: [LifeAreaMetersComponent],
	imports: [IonicModule, MarkdownModule],
	exports: [LifeAreaMetersComponent]
})
export class ComponentsModule {}
