import {Component} from "@angular/core";
import {UserService} from "../user.service";
import {NewUser} from "../newUser";

@Component({
  templateUrl: './new-user.component.html',
})
export class NewUserComponent{
  constructor(private userService: UserService) {}

  createNewUser(newUser: NewUser) {
    this.userService.createUser(newUser).subscribe(u => alert(`Created user with id: ${u.id}`));
  }
}
