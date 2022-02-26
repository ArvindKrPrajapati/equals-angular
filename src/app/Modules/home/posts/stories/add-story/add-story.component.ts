import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {
  fileEvent:any;
  imagesrc:string='';
  progress:number=0;
  uploading:boolean=false
  timer:number=0;
  constructor(private _api:ApiService,private _route:Router) { }

  ngOnInit(): void {
  }
  handleFileChange(e:any){
    this.fileEvent=e.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.imagesrc= reader.result as string;
    }
    reader.readAsDataURL(this.fileEvent)
  
  }

  close(){
    this.fileEvent="";
    this.imagesrc="";
  }
  save(){
    this.uploading=true;
    const date=new Date();
    let now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    const fd=new FormData();
     fd.append("file",this.fileEvent,now+"-"+this.fileEvent.name);  
    this._api.uploadStory(fd).subscribe((event:any)=>{   
       if (event.type === HttpEventType.UploadProgress) {
             let progress = Math.round(100 * event.loaded / event.total);
             this.progress=progress;
               if(progress==100){
                this.uploading=false;
                this.progressTimer()
              }
            }
         }); 
   }

   progressTimer(){
     let t=setInterval(()=>{
       this.timer+=1;
       if(this.timer>=100){
         clearInterval(t)
        this._route.navigate(["/home/posts"])
       }       
     },60)
   }
}
