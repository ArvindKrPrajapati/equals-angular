import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rightmenu',
  templateUrl: './rightmenu.component.html',
  styleUrls: ['./rightmenu.component.css']
})
export class RightmenuComponent implements OnInit {

  userdata:any;
  imageurl:string="";
  constructor(private _api:ApiService,private _meta:Meta) { 
   this.userdata= _api.getUserInfo();  
   this.imageurl=_api.imageurl; 
  }
  ngOnInit(): void {
  }
  changeMode(e:any){
    var tag;
    if(e.checked){
      tag={name:'color-scheme',content:'dark'}
      this._meta.addTag(tag)
    }else{
      tag={name:'color-scheme',content:'light'}
      this._meta.addTag(tag)
    }
   
  }
}
