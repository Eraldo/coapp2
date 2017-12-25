import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RolePage } from './role';
import {MarkdownModule} from "ngx-md";
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    RolePage,
  ],
  imports: [
    IonicPageModule.forChild(RolePage),
    MarkdownModule,
    UserItemComponentModule
  ],
})
export class RolePageModule {}
