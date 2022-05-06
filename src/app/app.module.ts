import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GoRestAuthInterceptor} from "./shared/go-rest-auth-interceptor";
import {GoRestConfig} from "./shared/goRestConfig";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GoRestAuthInterceptor,
    multi: true
  }, GoRestConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
