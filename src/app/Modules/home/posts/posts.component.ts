import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  data:any=[]
  commPost:any;
  imageurl:string
  comment:string=''
  saving:boolean=false
  postIndex:any;
  isLoading:boolean=true
  constructor(private _api:ApiService) {
    this.imageurl=_api.imageurl
   }

  ngOnInit(): void {
    this._api.getSubPost().subscribe((data:any)=>{
      if(data.success){
        this.data=data.data
        this.isLoading=false
      }
    })
  }
  
  saveComment(){
    this.saving=true
    this._api.doComment(this.commPost._id,this.comment).subscribe((res:any)=>{
       if(res.success){
         this.commPost="";
         this.comment=""
         this.saving=false
         this.data[this.postIndex].comments++;
       }
    })
  }
  commentData(e:any){
    this.postIndex=e
    this.commPost=this.data[e]
  }
}
