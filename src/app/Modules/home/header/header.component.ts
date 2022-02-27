import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuHandler=new EventEmitter()
  imageurl:string;
  userdata:any;
  constructor(private _api:ApiService) {
    this.imageurl=this._api.imageurl;
    this.userdata=this._api.getUserInfo()
  }

  ngOnInit(): void {
     }
  toggleMenu(state:boolean){
    this.menuHandler.emit(state)
  }
}
