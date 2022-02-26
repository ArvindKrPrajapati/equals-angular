import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  data:any=[]
  constructor(private _api:ApiService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
     this._route.paramMap.subscribe((p:any)=>{
       this.loadData(p.get('id'))
     })
  }
  loadData(id:string){
   this._api.getFollowersOrFollowing("getfollowers",id).subscribe((data:any)=>{
     if(data.success){
      this.data=data.data
     }
   })
  }

}
