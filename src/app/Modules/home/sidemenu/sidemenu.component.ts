import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  user: any;
  imageurl: string;
  constructor(private _api: ApiService) {
    this.imageurl = this._api.imageurl;
    this.user = _api.getUserInfo()
  }

  ngOnInit(): void {
  }

}
