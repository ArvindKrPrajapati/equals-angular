import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu: any;
  user: any;
  constructor(private _api: ApiService, private activatedroute: ActivatedRoute) {
    this.user = _api.getUserInfo()
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      console.log("activate", data);

    })
  }
  toggleMenu(state: any) {
    console.log(state);

    this.menu = state;
  }
}
