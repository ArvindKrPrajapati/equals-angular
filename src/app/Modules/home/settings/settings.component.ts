import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
   isLoading:boolean=true
   saving:boolean=false
   data:any={}
   copydata:any={}
   namefield:boolean=true
   emailfield:boolean=true
   genderfield:boolean=true
   dobfield:boolean=true
   aboutfield:boolean=true
   newpassfield:boolean=true
   newpass:string=""
   askPass:boolean=false
   password:string=""
   error:string=""
   sucessMsg:string=""
   psucess:string=""
  constructor(private _router:Router,private _api:ApiService) { 
    const id=_api.getUserInfo().id
    _api.getProfile(id).subscribe((res:any)=>{
      if(res.success){
        this.data=res.data
        this.formatDate()
        Object.assign(this.copydata, res.data);
        this.isLoading=false
      }
      
    })
  }
  
  formatDate(){
    let t=this.data.dob.split("T")[0].split("-")
    this.data.dob=t[0]+"-"+t[1]+"-"+t[2]
    
  }

  ngOnInit(): void {
  }
  logout():void{
    localStorage.clear();
    this._router.navigate(["/"]);
  }
  deleteUser(){
    this.saving=true
    this._api.deleteUser().subscribe((res:any)=>{
     if(res.success){
       this.logout()
     }
      
    })
  }

  enableEdit(field:string){
    this.namefield=field=='namefield' ? false : true
    this.emailfield=field=='emailfield' ? false : true
    this.genderfield=field=='genderfield' ? false : true
    this.dobfield=field=='dobfield' ? false : true
    this.aboutfield=field=='aboutfield' ? false : true
    this.newpassfield=field=='newpassfield' ? false : true
  }
  close(){
    this.password=""
    this.error=""
    this.askPass=false
    this.saving=false
    this.data=this.copydata   
    this.psucess=""
    this.sucessMsg="" 
    this.enableEdit("")
  }
  save(){
    this.askPass=true
  }



  editInDb(){
    this.error=""
    this.psucess=""
    this.sucessMsg=""
   if(this.password!==""){
    this.saving=true
    const l={
      name:this.data.name,
      email:this.data.email,
      dob:this.data.dob,
      gender:this.data.gender,
      about:this.data.about,
      newpass:this.newpass,
      password: this.password
    }
    this._api.editUserDetails(l).subscribe((res:any)=>{
      if(res.success){
        localStorage.setItem('token',res.token);
        this.password=""
        this.sucessMsg="your changes are saved sucessfully"
        if(this.newpass!=""){
          this.psucess="password changed successfully"
          this.newpass=""
        }
        this.error=""
        this.askPass=false
        this.saving=false
        this.enableEdit("")
      }
    },(err:any)=>{
      this.error=err.error.error
      this.saving=false
    })
    
   }else{
    this.error="old password is required"
   }
  }
}
