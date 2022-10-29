import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  el: any;
  action: boolean = true
  start: number = 0
  loadOnScroll: boolean = false
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let top = window.scrollY
    this.el = document.querySelector("#posts")
    let h = this.el.offsetHeight;
    if (window.innerHeight + top > h && this.action) {
      this.start += 20;
      this.loadOnScroll = true
      console.log(this.start);
      this.loadData();
    }
  }
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
    this.imageurl = this._api.imageurl
    _route.paramMap.subscribe((p: any) => {
      this.postid = p.get('id')
    })
  }

  ngOnInit(): void {
    this.isLoading = true
    if (this.action) {
      this.loadData();
    }

  }


  loadData() {
    this.action = false
    this._api.getComments(this.postid, this.start).subscribe((data: any) => {
      if (data.success) {
        if (data.data.length > 0) {
          this.data.push(...data.data)
          this.isLoading = false
          this.loadOnScroll = false
          this.action = true
        } else {
          this.isLoading = false
          this.loadOnScroll = false
        }

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
