import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NewUserFormComponent} from "./new-user-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NewUserComponent} from "./new-user.component";
import {UserService} from "../user.service";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {User} from "../user";
import {NewUser} from "../newUser";

describe('NewUserComponent', () => {
  let fixture: ComponentFixture<NewUserComponent>;
  let rendered: HTMLElement;
  const fakeUserService = jasmine.createSpyObj<UserService>('FakeUserService',['createUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        NewUserComponent, NewUserFormComponent
      ],
      providers: [{provide: UserService, useValue: fakeUserService}]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    fixture.detectChanges();
    rendered = fixture.nativeElement;
  });

  it('renders header', ()=>{
    expect(rendered.querySelector('h1')).toHaveTextContent('Registration');
  });

  it('creates user based on output emitted by form', ()=>{
    const newUser = new NewUser('Tony', 'tony@gmail.com', 'male');
    fakeUserService.createUser.and.returnValue(of( {id:33} as User))
    const newUserFormComponent = fixture.debugElement.query(By.directive(NewUserFormComponent));
    newUserFormComponent.triggerEventHandler('submittedNewUser', newUser);

    expect(fakeUserService.createUser).toHaveBeenCalledOnceWith(newUser);
  });

});
