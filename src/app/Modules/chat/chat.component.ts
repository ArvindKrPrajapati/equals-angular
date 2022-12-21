import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loading: boolean = true
  data: any = []
  skip: number = 0
  imageurl: string = ""
  constructor(private _api: ApiService) {
    this.imageurl = _api.imageurl
  }

  ngOnInit(): void {
    this._init()
  }

  _init(): void {
    this._api.getChats(this.skip).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data
        this.loading = false
      }
    })
  }

}
