import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
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
      this.loadData();
    }
  }
  data: any = []
  isLoading: boolean = true;
  id: any
  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe((p: any) => {
      this.id = p.get('id')
    })
  }

  ngOnInit(): void {
    if (this.action) {
      this.loadData();
    }
  }
  loadData() {
    this.action = false
    this._api.getFollowersOrFollowing("getfollowers", this.id, this.start).subscribe((data: any) => {
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

}
