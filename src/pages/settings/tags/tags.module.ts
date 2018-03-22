import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagsPage } from './tags';
import {TagComponentModule} from "../../../components/tag/tag.module";

@NgModule({
  declarations: [
    TagsPage,
  ],
  imports: [
    IonicPageModule.forChild(TagsPage),
    TagComponentModule
  ],
})
export class TagsPageModule {}
