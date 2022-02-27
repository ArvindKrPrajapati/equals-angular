import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
    data:any=[]
    isLoading:boolean=true
  constructor(private _api:ApiService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
     this._route.paramMap.subscribe((p:any)=>{
       this.loadData(p.get('id'))
     })
  }
  loadData(id:string){
   this._api.getFollowersOrFollowing("getfollowing",id).subscribe((data:any)=>{
     if(data.success){
      this.data=data.data
      this.isLoading=false
     }
   })
  }
}
