import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
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
      this.start += 10;
      this.loadData();
    }
  }
  data: any = []
  commPost: any;
  imageurl: string
  comment: string = ''
  saving: boolean = false
  postIndex: any;
  isLoading: boolean = true
  userdata: any;
  constructor(private _api: ApiService) {
    this.imageurl = _api.imageurl
    this.userdata = _api.getUserInfo()
  }

  ngOnInit(): void {
    if (this.action) {
      this.loadData();
    }
  }
  loadData() {
    this.action = false
    this.loadOnScroll = true
    this._api.getSubPost(this.start).subscribe((data: any) => {
      console.log(data);

      if (data.success) {
        if (data.data.length > 0) {
          this.data.push(...data.data)
          this.isLoading = false
          this.loadOnScroll = false
          this.action = true
        } else {
          // this.isLoading = false
          this.loadOnScroll = false
        }

      }
    })
  }
  saveComment() {
    this.saving = true
    this._api.doComment(this.commPost._id, this.comment, this.commPost.postedby._id).subscribe((res: any) => {
      if (res.success) {
        this.commPost = "";
        this.comment = ""
        this.saving = false
        this.data[this.postIndex].comments++;
      }
    })
  }
  commentData(e: any) {
    this.postIndex = e
    this.commPost = this.data[e]
  }
  deletePost(e: any) {
    this.data.splice(e, 1)
  }


}
