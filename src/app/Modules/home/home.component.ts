import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu: any;
  user: any;
  constructor(private _api: ApiService) {
    this.user = _api.getUserInfo()
  }

  ngOnInit(): void {
  }
  toggleMenu(state: any) {
    console.log(state);

    this.menu = state;
  }
}
