import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RolePage } from './role';
import {MarkdownModule} from "ngx-markdown";
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    RolePage,
  ],
  imports: [
    IonicPageModule.forChild(RolePage),
    MarkdownModule.forChild(),
    UserItemComponentModule
  ],
})
export class RolePageModule {}
