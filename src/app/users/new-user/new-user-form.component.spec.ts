import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NewUserFormComponent} from "./new-user-form.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('NewUserFormComponent', () => {
  let fixture: ComponentFixture<NewUserFormComponent>;
  let rendered: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
         ReactiveFormsModule
      ],
      declarations: [
        NewUserFormComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserFormComponent);
    fixture.detectChanges();
    rendered = fixture.nativeElement;
  });

  it('proposes valid genders in order', ()=>{
    const genderOptions = rendered.querySelectorAll('#gender option') as NodeListOf<HTMLOptionElement>;

    expect(genderOptions[0].value).toBe('female');
    expect(genderOptions[1].value).toBe('male');
  });

  describe('with an invalid form', ()=>{
    it('displays form with no error message and disabled submit button by default ', ()=>{
      expect(rendered.querySelectorAll('.alert')).toHaveSize(0);
    });

    it('requires a name', ()=>{
      fixture.setValueOfInput('#name', '');

      expect(rendered.querySelectorAll('.alert')).toHaveSize(1);
      expect(rendered.querySelector('.alert')).toHaveTextContent('Name is required.');
    });

    it('requires name to be at least 4 char', ()=>{
      fixture.setValueOfInput('#name', '123');

      expect(rendered.querySelectorAll('.alert')).toHaveSize(1);
      expect(rendered.querySelector('.alert')).toHaveTextContent('Name must be at least 4 characters long.');
    });

    it('requires a valid e-mail', ()=>{
      fixture.setValueOfInput('#email', 'invalidemail');

      expect(rendered.querySelectorAll('.alert')).toHaveSize(1);
      expect(rendered.querySelector('.alert')).toHaveTextContent('Email is required and must be of valid format');
    });

    it('requires selecting a valid gender in orger to enable button', ()=>{
      fixture.setValueOfInput('#name', 'ValidName');
      fixture.setValueOfInput('#email', 'valid@email.com');
      fixture.detectChanges();
      let submitButton = rendered.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitButton).toBeDisabled();
    });
  });

  describe('with a valid form', ()=>{
    let submitButton: HTMLButtonElement;

    beforeEach(()=>{
      fixture.setValueOfInput('#name', 'ValidName');
      fixture.setValueOfInput('#email', 'valid@email.com');
      fixture.setValueOfSelect('#gender', 'female');
      submitButton = rendered.querySelector('button[type="submit"]') as HTMLButtonElement;
    })

    it('enables submit button', ()=>{
      expect(submitButton).toBeEnabled();
    });

    it('emits new user to create when form is submitted', ()=>{
      spyOn(fixture.componentInstance.submittedNewUser, 'emit').and.callFake((newUser)=>{
        expect(newUser?.name).toBe('ValidName');
        expect(newUser?.email).toBe('valid@email.com');
        expect(newUser?.gender).toBe('female');
      });

      submitButton.click();
    });
  });
});
