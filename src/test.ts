// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import {ComponentFixture, getTestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import JasmineExpect from "jasmine-expect";
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom/dist';


declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);


declare module "@angular/core/testing" {
  interface ComponentFixture<T>{
    setValueOfInput(selector: string, value: string) : void;
    setValueOfSelect(selector: string, value: string) : void;
  }
}

ComponentFixture.prototype.setValueOfInput = function(selector: string, value: string){
    const input = this.nativeElement.querySelector(selector) as HTMLInputElement;

    input.value = value;
    input.dispatchEvent(new Event('input'));
    this.detectChanges();
}

ComponentFixture.prototype.setValueOfSelect = function(selector: string, value: string){
    const select = this.nativeElement.querySelector(selector) as HTMLSelectElement;

    select.dispatchEvent(new Event('click'));
    select.value = value;
    select.dispatchEvent(new Event('change'));
    this.detectChanges();
}


beforeAll(() => {
  // @ts-ignore
  jasmine.getEnv().addMatchers(JasmineDOM);
  // @ts-ignore
  jasmine.getEnv().addMatchers(JasmineExpect);
});
