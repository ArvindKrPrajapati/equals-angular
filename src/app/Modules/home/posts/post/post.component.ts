import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';
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
imageurl:string;
addComment:boolean=true
  constructor(private _api:ApiService) { 
    this.imageurl=_api.imageurl
  }

  ngOnInit(): void {
   
  }
  doReact(action:string){    
    if(action==="like"){
     this._api.doReact(this.postdata._id,action).subscribe((res:any)=>{
       if(res.success){
        this.postdata.ilike=true
        this.postdata.likes++;
       }
     })
    }else if(action==="unlike"){
      this._api.doReact(this.postdata._id,action).subscribe((res:any)=>{
        if(res.success){
         this.postdata.ilike=false
         this.postdata.likes--;
        }
      })
    }
  }

  saveComment(){
    this.commentHandler.emit(this.postindex)
  }
}
