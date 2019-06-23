import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm, AbstractControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
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
   * Confirm Password
   * - To match the confirm password field with password field.
   * @param passwordKey 
   * @param confirmPasswordKey 
   */
  confirmPassword(passwordKey, confirmPasswordKey) {
    return (group: FormGroup): {
      [key: string]: any
    } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password && confirmPassword){
        if(password.value && confirmPassword.value && password.value !== confirmPassword.value) {
          const err = confirmPassword.errors || {}; 
          Object.assign(err, {missMatchPassword: true});
          confirmPassword.setErrors(err);
        } else {
          if(confirmPassword.errors && confirmPassword.errors.missMatchPassword) {
            const err = confirmPassword.errors;
            delete err.missMatchPassword;
            confirmPassword.setErrors(err);
          }
        }
      }
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  /**
   * Create Form
   * - Will create reactive form.
   */
  createForm() {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{0,}$')])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{0,}$')])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$') ])],
      address: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    }, {
        validator: this.confirmPassword('password', 'confirmPassword')
      });
  }

  /**
   * Signup
   * - On click of signup button and will have success and error handler of signup
   */
  signup() {
    const payload = {
      userName: this.signupForm.controls["userName"].value,
      name: this.signupForm.controls["name"].value,
      email: this.signupForm.controls["email"].value,
      password: this.signupForm.controls["password"].value,
      mobileNumber: this.signupForm.controls["mobileNumber"].value,
      address: this.signupForm.controls["address"].value,
    }
    this.usersService.setUser(payload).then(success => {
      this.snackBar.open('User has been created successfully.', 'close', {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      });
    }, error => {
      this.snackBar.open(error, 'close', {
        duration: 2000,
      });
    });

  }

}
