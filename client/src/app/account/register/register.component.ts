import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  doNotMatch: string;
  errorMessage: string;
  success: boolean;
  isSaving = false;
  registerForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(254),
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  register() {
    this.isSaving = true;
    this.doNotMatch = null;
    this.errorMessage = null;
    let registerAccount: any = {
      name: this.registerForm.get('name').value,
    };
    const login = this.registerForm.get(['login']).value;
    const email = this.registerForm.get(['email']).value;
    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
    } else {
      registerAccount = { ...registerAccount, login, email, password };
      this.doNotMatch = null;
    }
    this.accountService.register(registerAccount).subscribe(
      () => {
        this.isSaving = false;
        this.success = true;
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.isSaving = false;
      }
    );
  }
}
