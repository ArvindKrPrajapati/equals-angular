import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rightmenu',
  templateUrl: './rightmenu.component.html',
  styleUrls: ['./rightmenu.component.css']
})
export class RightmenuComponent implements OnInit {

  userdata:any;
  imageurl:string="";
  constructor(private _api:ApiService) { 
   this.userdata= _api.getUserInfo();  
   this.imageurl=_api.imageurl; 
  }
  ngOnInit(): void {
  }

}
