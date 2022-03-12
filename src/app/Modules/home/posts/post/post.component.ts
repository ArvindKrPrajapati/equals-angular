import { Component, OnInit ,Input, Output , EventEmitter, HostListener} from '@angular/core';
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
h:number=250
w:number=500
imageurl:string;
userdata:any;
deleting:boolean=false
addComment:boolean=true
reacting:boolean=false
  constructor(private _api:ApiService,private _route:Router) { 
    this.imageurl=_api.imageurl
    this.userdata=_api.getUserInfo()
  }
  
  @HostListener('window:resize', ['$event'])
onResize(event:any) {
 var ww=  event.target.innerWidth;
 let w=520
 if(ww<768){
  let bodyw:any=document.getElementById("body")
   w=bodyw.offsetWidth
 }

 this.w=w
 this.h=w/2
}

  ngOnInit(): void {
      const text=this.postdata.text
    if(text && !(this.postdata.image)){
     const reg=/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi
     const a = text.match(reg)

     if(a&&a.length>0){
      const link=a[a.length - 1]
       var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
         var match = link.match(regExp);
         if(match&&match[7].length==11){
            this.postdata.link=match[7]
         }
     }
     let w:any=document.getElementById("body")
     this.w= w.offsetWidth;
     this.h=w.offsetWidth / 2
    }
  }
  ngAfterViewInIt(){
  
    let w:any=document.getElementById("body")
    this.w= w.offsetWidth;
    this.h=w.offsetWidth / 2
  }

  doReact(action:string){
    this.reacting=true  
    if(action==="like"){
     this._api.doReact(this.postdata._id,action,this.postdata.postedby._id).subscribe((res:any)=>{
       if(res.success){
         this.reacting=false
        this.postdata.ilike=true
        this.postdata.likes++;
       }
     })
    }else if(action==="unlike"){
      this._api.doReact(this.postdata._id,action,this.postdata.postedby._id).subscribe((res:any)=>{
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
  var capturing:any = document.querySelectorAll(".capturing")[this.postindex]
  capturing.innerText="capturing......"
    html2canvas(element,{useCORS: true}).then(function(canvas) {
        canvas.toBlob(function(blob:any){
          var file = new File([blob], "picture.png", {type: 'image/jpeg'});
          var filesArray = [file];
          navigator.share({
            text: 'Join equals India ka apna social app',
            files: filesArray,
            title: 'equals',
            url: 'https://equals-angular.herokuapp.com/comment/'+postid
          }).then(()=>{
            capturing.innerText=""
          }).catch((err)=>{
            capturing.innerText="try again"
          })
            // let link = document.createElement("a");
            // link.download = "equals-image.png";
            // link.href = URL.createObjectURL(blob);
            // link.click();

        },'image/png');
    });
}

  urlify(text:string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url){
      return '<a href='+url+' class="a" target="_blank">'+url+'</a>'
  })
  // return text
}
}

// to fetch all yt links in a text
// const text=this.postdata.text
// this.postdata.links=[]
// if(text && !(this.postdata.image)){
//  const reg=/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi
//  const a = text.match(reg)
//  if(a&&a.length>0){
//   a.map((links:string)=>{
//     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//     var match = links.match(regExp);
//     if(match&&match[7].length==11){
//        this.postdata.links.push(match[7])
      
//     }
//   })
//  }
//  let w:any=document.getElementById("body")
//  this.w= w.offsetWidth;
//  this.h=w.offsetWidth / 2
// }