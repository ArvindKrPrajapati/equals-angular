import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  postid: any;
  data: any = []
  userdata: any;
  imageurl: string = ''
  comment: string = ''
  saving: boolean = false
  isLoading: boolean = false
  postedby: any;
  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    this.userdata = _api.getUserInfo()
    _route.paramMap.subscribe((p: any) => {
      this.postid = p.get('id')
    })
  }

  ngOnInit(): void {
    this.imageurl = this._api.imageurl
    this.isLoading = true
    this._api.getComments(this.postid).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data
        this.isLoading = false
      }
    })
  }

  getPostedBy(e: any) {
    this.postedby = e;
  }
  saveComment() {
    this.saving = true
    this._api.doComment(this.postid, this.comment, this.postedby).subscribe((res: any) => {
      if (res.success) {
        let a = {
          by: {
            _id: this.userdata.id,
            name: this.userdata.name,
            dp: this.userdata.dp
          },
          comm: this.comment
        }
        this.data.unshift(a)
        this.comment = ""
        this.saving = false
      }
    })
  }

}
