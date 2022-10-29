import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rightmenu',
  templateUrl: './rightmenu.component.html',
  styleUrls: ['./rightmenu.component.css']
})
export class RightmenuComponent implements OnInit {

  userdata: any;
  imageurl: string = "";
  constructor(private _api: ApiService, private el: ElementRef) {
    this.userdata = _api.getUserInfo();
    this.imageurl = _api.imageurl;
  }
  ngOnInit(): void {
  }
  changeMode(e: any) {
    this.el.nativeElement.style.setProperty(' --back', '#0c0c0c')

    if (e.checked) {
      // document.body.style.background="#0c0c0c"
      // document.documentElement.style.setProperty(' --back','#0c0c0c')
      // document.documentElement.style.setProperty( ' --text','white')

      // console.log( document.documentElement.style.setProperty(' --back','#0c0c0c'))

    } else {
      // document.body.style.background="white"
      document.documentElement.style.setProperty(' --back', 'white')
      document.documentElement.style.setProperty(' --text', 'black')

    }

  }
}
