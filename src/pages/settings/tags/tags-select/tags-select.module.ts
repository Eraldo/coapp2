import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagsSelectPage } from './tags-select';

@NgModule({
  declarations: [
    TagsSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(TagsSelectPage),
  ],
})
export class TagsSelectPageModule {}
