import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errormsg: string = '';
  loging: boolean = false;
  mobile: any = '';
  password: any;
  constructor(private _api: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }
  login(): void {
    this.errormsg = '';
    this.loging = true;
    console.log(this.mobile, this.password);

    if (this.mobile.length == 10 && this.password) {
      this._api.login({ mobile: this.mobile, password: this.password }).subscribe((data: any) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.data));
          this._router.navigate(['/home/posts'])
        }
      }, (err: any) => {
        this.loging = false;
        this.errormsg = err.error.error || err.error.message || "connection error"
      })
    } else {
      this.loging = false;
      this.errormsg = "all fields are required"
    }
  }
}
