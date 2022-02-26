import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  text:string='';
  timer:number=0
  saving:boolean=false
  saved:boolean=false
  constructor(private _api:ApiService,private _route:Router) { }

  ngOnInit(): void {
  }
  
  saveText(){
    this.saving=true
    this.saved=true
   this._api.uploadTextStory(this.text).subscribe((res:any)=>{
     if(res.success){
       this.saved=false;
       this.progressTimer()
     }
   })
  }

  progressTimer(){
    let t=setInterval(()=>{
      this.timer+=1;
      if(this.timer>=100){
        clearInterval(t)
       this._route.navigate(["/home/posts"])
      }       
    },30)
  }
}
