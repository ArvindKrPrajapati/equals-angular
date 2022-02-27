import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.css']
})
export class ViewStoryComponent implements OnInit {
  id:any;
  data:any;
  imageurl:string;
  index:number=0
  timer:number=49
  constructor(private _api:ApiService,private _activatedRoute:ActivatedRoute) {
  this.imageurl=_api.imageurl;
    _activatedRoute.paramMap.subscribe((p:any)=>{
      this.id=p.get("id")
    })
   }

  ngOnInit(): void {
this._api.getUserStories(this.id).subscribe((res:any)=>{
  if(res.success){
    this.data=res.data
    // console.log(this.data)
  }
})
  }

decrease(){
  this.index--;
}
increase(){
  this.index++;
}
}
