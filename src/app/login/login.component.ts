import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   errormsg:string='';
   loging:boolean=false;
  constructor(private _api:ApiService,private _router:Router) { }

  ngOnInit(): void {
  }
   login(data:any) :void{ 
     this.errormsg='';
     this.loging=true;
     if(data.value.email && data.value.password){
      this._api.login(data.value).subscribe((data:any)=>{
        if(data.success){
          localStorage.setItem('token',data.token);
          this._router.navigate(['/home/posts'])
        }
      },(err:any)=>{
        this.loging=false;
        this.errormsg=err.error.error || "connection error"
      })
    }else{
      this.loging=false;
       this.errormsg="all fields are required"
    }
   }
}
