import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  success: Boolean;
  constructor(private _apiservice: ApiService, private toastr: ToastrService) {}
  ngOnInit() {
    this.resetForm();
  }

  register(form: NgForm) {
    this._apiservice.registerNewUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }


  resetForm(form?: NgForm) {
    this.user = {
      name: '',
      password: '',
      email: '',
    }
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
