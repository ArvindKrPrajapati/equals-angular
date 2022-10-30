import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-varify-otp',
  templateUrl: './varify-otp.component.html',
  styleUrls: ['./varify-otp.component.css']
})
export class VarifyOtpComponent implements OnInit {
  error: string = ""
  isLoading: boolean = false
  mobile: any;
  constructor(private _api: ApiService, private _router: Router) {
    const state = this._router.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.mobile = state["mobile"]
    } else {
      _router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }
  handleSubmit(data: any) {
    const otp = data.value.otp;
    this.error = ''
    const d = {
      mobile: this.mobile,
      otp
    }
    if (otp.toString().length == 6) {
      this.isLoading = true
      this._api.varifyOtp(d).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.data));
          this._router.navigate(['/home/posts'])
        }
      }, (err: any) => {
        console.log(err);

        this.isLoading = false;
        this.error = err.error.error || err.error.message || "connection error"
      })
    } else {
      this.error = "otp should be 6 digit"
      this.isLoading = false
    }
  }
}
