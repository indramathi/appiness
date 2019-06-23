import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  
  MatButtonModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatSnackBarModule,
  MatListModule
} from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AuthenticatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,  
    MatCardModule,  
    MatFormFieldModule,  
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatListModule
  ], 
  providers: [  
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    UsersService  
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
