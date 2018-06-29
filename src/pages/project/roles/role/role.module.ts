import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RolePage } from './role';
import {MarkdownModule} from "ngx-markdown";
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";
import {RoleItemComponentModule} from "../../../../components/role-item/role-item.module";

@NgModule({
  declarations: [
    RolePage,
  ],
  imports: [
    IonicPageModule.forChild(RolePage),
    MarkdownModule.forChild(),
    UserItemComponentModule,
    RoleItemComponentModule
  ],
})
export class RolePageModule {}
