import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
  @Input() data: any;
  @Input() index: any;
  imageurl: string = ''
  postid: string = ''
  reacting: boolean = false

  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    // this.userdata = _api.getUserInfo()
    this.imageurl = this._api.imageurl

    _route.paramMap.subscribe((p: any) => {
      this.postid = p.get('id')
    })
  }

  ngOnInit(): void {
  }

  formatDate(d: Date, now: Date) {
    const pd = new Date(d)
    const nd = new Date(now)
    let t = Math.floor(Number(nd.getTime() - pd.getTime()) / 60000)
    let dd = nd.getDate() - pd.getDate()
    if (t === 0) {
      return "Just Now";
    }
    if (t < 60) {
      return t + " min ago";
    }
    if (t >= 60 && t < 1440) {
      return (t / 60).toString().split(".")[0] + " hour ago"
    }
    if (t >= 1440 && t < 39200) {
      return (t / 1440).toString().split(".")[0] + " days ago"
    }
    if (t > 39200 && t < 470400) {
      return (t / 39200).toString().split(".")[0] + " month ago"
    }
    if (t > 470400) {
      return (t / 470400).toString().split(".")[0] + " year ago"
    }
    return "a long ago"
  }
  doReact(action: string) {
    this.reacting = true
    const commid = this.data._id;
    if (action === "like") {
      this._api.doReactOnComment(this.postid, "like", commid).subscribe((res: any) => {
        if (res.success) {
          this.reacting = false
          this.data.isLiked = true
          this.data.likes++;
        }
      })
    } else if (action === "dislike") {
      this._api.doReactOnComment(this.postid, "dislike", commid).subscribe((res: any) => {
        if (res.success) {
          this.reacting = false
          this.data.isLiked = false
          this.data.likes--;
        }
      })
    }
  }
}
