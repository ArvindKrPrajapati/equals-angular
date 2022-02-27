import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
   data:any=[]
   isLoading:boolean=true
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
   this._api.unFollowedUsers().subscribe((data:any)=>{
     if(data.success){
       this.data=data.data
       this.isLoading=false
     }
   })
  }

}
