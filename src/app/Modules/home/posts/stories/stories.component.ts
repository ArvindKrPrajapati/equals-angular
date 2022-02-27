import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  data:any=[]
  imageurl:string='';
  constructor(private _api:ApiService,private _route:Router) {
    this.imageurl=_api.imageurl
   }

  ngOnInit(): void {
    this._api.getSubStories().subscribe((res:any)=>{
      if(res.success){
        this.data=res.data
      }
    })
  }

  formatDate(date:string){
    let t = Math.floor(Number(date) / 60000)
    if(t===0){
      return "Just Now";
    }
    if(t<60){
      return t+" min ago";
    }
    if(t>=60){
      return t / 60 +" hour ago"
    }
    return "invalid"
  }

  view(id:string){
    this._route.navigate(["/home/story",id])
  }
}
