import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';

import { UsersService } from '../users.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
 * ng On Init
 * - Will call the create form method.
 */
  ngOnInit() {
    this.createForm();
  }

    /**
   * Create Form
   * - Will create reactive form.
   */
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{0,}$')])]
    });
  }

  /**
   * Login
   * - Will do login.
   */
  login() {
    const payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.usersService.doAuthentication(payload).then(success => {
      this.snackBar.open('' + success['message'], 'close', {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/authenticated'], { queryParams: { id: success['data'].id } });
      });
    }, error => {
      this.snackBar.open(error, 'close', {
        duration: 2000,
      });
    });
  }

}
