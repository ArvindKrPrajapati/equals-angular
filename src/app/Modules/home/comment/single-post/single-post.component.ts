import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Output() postedby = new EventEmitter()
  data: any
  isLoading: boolean = false
  postid: any;
  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    _route.paramMap.subscribe((p: any) => {
      this.postid = p.get("id")
    })
  }

  ngOnInit(): void {
    this.isLoading = true
    this._api.getSpecificPost(this.postid).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data[0]
        this.isLoading = false
        this.postedby.emit(res.data.postedby._id)
      }
    })
  }

}
