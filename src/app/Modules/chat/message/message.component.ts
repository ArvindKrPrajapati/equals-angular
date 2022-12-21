import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  id: any = ""
  user: any;
  userLoading: boolean = true
  isLoading: boolean = true
  imageurl: any;
  msgText: any;
  combinedId: string = ""
  messages: any = []
  currentUser: any;
  skip: number = 0
  loadingMore: boolean = false

  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    _route.paramMap.subscribe((p: any) => {
      this.id = p.get('id')
      this.currentUser = _api.getUserInfo()
      this.combinedId = this._api.combinedId(this.id)
      this.imageurl = _api.imageurl
      this.getUserInfo()
    })
  }

  ngOnInit(): void {
  }

  getUserInfo() {
    this._api.getProfile(this.id).subscribe((data: any) => {
      if (data.success) {
        this.user = data.data
        this.userLoading = false

        if (data.data.ifollow) {
          this.getMessages()
        }
      }
    })
  }

  getMessages() {
    this._api.getMessage(this.combinedId, this.skip).subscribe((res: any) => {
      if (res.success) {
        this.messages = [...this.messages, ...res.data]
        this.isLoading = false
        this.loadingMore = false
      }
    })
  }

  loadMore() {
    this.skip = this.skip + 20
    this.loadingMore = true
    this.getMessages()
  }

  send(): void {
    const msg = {
      roomId: this.combinedId,
      receiver: this.id,
      text: this.msgText
    }
    this.messages.unshift({ sender: this.currentUser.id, text: this.msgText })
    this.msgText = ""

    this._api.sendMessage(msg).subscribe((res: any) => {
      if (!res.success) {
        this.messages.shift()
      }

    })

  }

}
