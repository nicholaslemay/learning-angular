import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Title} from "@angular/platform-browser";

describe('AppComponent', () => {
  let titleServiceSpy: jasmine.SpyObj<Title>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    titleServiceSpy = jasmine.createSpyObj<Title>('TitleSpy',['setTitle']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide:Title, useValue: titleServiceSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  describe('After init', ()=>{
    let compiled: HTMLElement;

    beforeEach(async () => {
      compiled = fixture.nativeElement as HTMLElement;
    });

    it('should render page title', () => {
      expect(compiled.querySelector('h1')?.textContent).toContain("Hello World. I'm learning angular");
    });

    it('should set browser title', () => {
      expect(titleServiceSpy.setTitle).toHaveBeenCalledOnceWith('Hello World!');
    });
  });

});
