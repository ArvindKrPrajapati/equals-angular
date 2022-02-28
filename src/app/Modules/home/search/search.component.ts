import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  data:any=[]
  isLoading:boolean=false
  imageurl:string=''
  constructor(private _api:ApiService) { 
    this.imageurl=_api.imageurl
  }

  ngOnInit(): void {
  }
  search(e:any){
    let s= e.target.value;
    if(s){
      this.isLoading=true
    this._api.liveSearch(s).subscribe((res:any)=>{
      if(res.success){
        this.data=res.data
        this.isLoading=false
      }
    })
    }
  }
}
