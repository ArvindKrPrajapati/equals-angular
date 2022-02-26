import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
   data:any=[]
   imageurl:string='';
  constructor(private _api:ApiService,private _route:ActivatedRoute) { 
    this.imageurl=_api.imageurl
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((p:any)=>{
      let id=p.get('id')
      this.loadData(id)
    })
  }
  loadData(id:string){
   this._api.getuserPost(id).subscribe((data:any)=>{
     if(data.success){
       this.data=data.data
     }
   })
  }
}
