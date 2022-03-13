import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewUser} from "../newUser";

@Component({
  selector: 'new-user-form',
  templateUrl: './new-user-form.component.html',
})
export class NewUserFormComponent {

  @Output() submittedNewUser = new EventEmitter<NewUser>()
  genders = ['female', 'male'];
  newUserForm: FormGroup;

  constructor() {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [Validators.email]),
      gender: new FormControl('', []),
    })
  }

  submit() {
    this.submittedNewUser.emit(new NewUser(this.name.value, this.email.value, this.gender.value));
  }

  get email() {
    return this.newUserForm.get('email')!;
  }

  get gender() {
    return this.newUserForm.get('gender')!;
  }

  get name() {
    return this.newUserForm.get('name')!;
  }

}
