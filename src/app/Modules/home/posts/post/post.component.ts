import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
@Input() postdata:any;
@Input() postindex:any;
@Output() commentHandler= new EventEmitter()
@Output() deleteHandler= new EventEmitter()

imageurl:string;
userdata:any;
deleting:boolean=false
addComment:boolean=true
reacting:boolean=false
  constructor(private _api:ApiService,private _route:Router) { 
    this.imageurl=_api.imageurl
    this.userdata=_api.getUserInfo()
  }

  ngOnInit(): void {
   
  }
  doReact(action:string){
    this.reacting=true  
    if(action==="like"){
     this._api.doReact(this.postdata._id,action).subscribe((res:any)=>{
       if(res.success){
         this.reacting=false
        this.postdata.ilike=true
        this.postdata.likes++;
       }
     })
    }else if(action==="unlike"){
      this._api.doReact(this.postdata._id,action).subscribe((res:any)=>{
        if(res.success){
          this.reacting=false
         this.postdata.ilike=false
         this.postdata.likes--;
        }
      })
    }
  }

  saveComment(){
    this.commentHandler.emit(this.postindex)
  }

  deletePost(id:string){
    this.deleting=true
    this._api.deletePost(id).subscribe((res:any)=>{
      if(res.success){
        this.deleteHandler.emit(this.postindex)
        this._route.navigate(["/home"])
      }
    })
  }

  formatDate(d:Date,now:Date){
    const pd=new Date(d)
    const nd=new Date(now)
    let t = Math.floor(Number(nd.getTime() - pd.getTime()) / 60000)
    let dd=nd.getDate() - pd.getDate()
    if(t===0){
      return "Just Now";
    }
    if(t<60){
      return t+" min ago";
    }
    if(t>=60 && t<1440){
      return (t / 60).toString().split(".")[0] +" hour ago"
    }
    if(t>=1440 && t<39200){
      return (t / 1440).toString().split(".")[0] +" days ago"
    }
    if(t>39200 && t < 470400){
      return (t / 39200).toString().split(".")[0] +" month ago"
    }
    if(t > 470400){
      return (t / 470400).toString().split(".")[0] +" year ago"
  }
  return "a long ago"
}

externalShare(postid:string){
  let element:any = document.querySelectorAll(".post")[this.postindex];
    html2canvas(element,{useCORS: true}).then(function(canvas) {
      //  let image= canvas.toDataURL()  //.replace('image/jpeg', 'image/octet-stream');
      // canvas.toBlob((blob:any) => navigator.share({blob: blob, mimeType: 'image/png'}),
      // 'image/png');
        canvas.toBlob(function(blob:any){
          var file = new File([blob], "picture.png", {type: 'image/jpeg'});
          var filesArray = [file];
          navigator.share({
            text: 'post from equals',
            files: filesArray,
            title: 'equals',
            url: 'https://equals-angular.herokuapp.com'
          });
        //     let link = document.createElement("a");
        //     link.download = "equals-image.png";
        //     link.href = URL.createObjectURL(blob);
        //     link.click();

        },'image/png');
    });
}
}
