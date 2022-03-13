import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewUserFormComponent} from "./new-user/new-user-form.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {UserService} from "./user.service";
import {UsersRoutingModule} from "./users-routing-module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [NewUserFormComponent, NewUserComponent],
  providers: [UserService,],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
