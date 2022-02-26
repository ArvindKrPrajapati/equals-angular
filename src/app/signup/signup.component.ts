import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   firstName:string="";
   lastName:string="";
   email:string="";
   password:string="";
   cpassword:string="";
   gender:string="";
   error:string="";
   signing:boolean=false
   constructor(private _api:ApiService,private _route:Router) { }

  ngOnInit(): void {
  }

  setGender(e:any){
    this.gender=e.target.value
  }
  singup(){
    this.error=""
    if(this.firstName && this.lastName && this.email && this.password && this.cpassword && this.gender){
      if(this.password===this.cpassword){
        this.signing=true
        let a={
          name:this.firstName+" "+this.lastName,
          email:this.email,
          password:this.password,
          gender:this.gender
        }
        this._api.signup(a).subscribe((res:any)=>{
          if(res.success){
            localStorage.setItem('token',res.token);
            this._route.navigate(['/home/posts'])
          }
        },(err:any)=>{
          this.signing=false;
          this.error=err.error.error || "connection error"
        })
      }else{
        this.error="password doesnt match"
      }
    }else{
      this.error="each field is required"
    }
  }
}
