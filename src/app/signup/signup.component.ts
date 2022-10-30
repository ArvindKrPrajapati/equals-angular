import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  mobile: any = '';
  name: string = ''

  password: string = "";
  cpassword: string = "";
  gender: string = "";
  error: string = "";
  signing: boolean = false
  constructor(private _api: ApiService, private _route: Router) { }

  ngOnInit(): void {
  }

  setGender(e: any) {
    this.gender = e.target.value
  }
  signup() {
    this.error = ""
    if (this.name && this.mobile && this.password && this.cpassword && this.gender) {
      if (this.password === this.cpassword) {
        this.signing = true
        let a = {
          name: this.name,
          mobile: this.mobile,
          password: this.password,
          gender: this.gender
        }
        this._api.signup(a).subscribe((res: any) => {
          if (res.success) {
            // localStorage.setItem('token', res.token);
            // localStorage.setItem('user', JSON.stringify(res.data));
            this._route.navigate(['/varify-otp'], { state: { mobile: this.mobile } })
          }
        }, (err: any) => {
          console.log(err);

          this.signing = false;
          this.error = err.error.error || err.error.message || "connection error"
        })
      } else {
        this.error = "password doesnt match"
      }
    } else {
      this.error = "each field is required"
    }
  }
}
