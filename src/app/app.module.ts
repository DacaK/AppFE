import { AuthGuard } from './auth/auth.guard';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UtilModule } from './util/util.module';
import { EntitiesModule } from './entities/entities.module';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth/auth.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HeaderComponent } from './layout/header/header.component';
import { TokenInterceptorService } from './auth/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EntitiesModule,
    PagesModule,
    UtilModule
  ],
  providers: [AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
