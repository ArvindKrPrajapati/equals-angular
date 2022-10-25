import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  user: any;
  constructor(private _api: ApiService) {
    this.user = _api.getUserInfo()
  }

  ngOnInit(): void {
  }

}
