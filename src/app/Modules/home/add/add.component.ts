import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent,base64ToFile } from 'ngx-image-cropper';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  imageurl:string;
  userdata:any;
  file:any;
  imgsrc:any;
  text:string=''
  showbox:boolean=false
  saving:boolean=false
  uploadingProgress:number=0
  savingMsg:string="";
  savedImgurl:string=""
  constructor(private _api:ApiService) { 
    this.imageurl=_api.imageurl
    this.userdata=_api.getUserInfo()
  }

  ngOnInit(): void {
  }
   
  setImage(e:any){
   let file=e.target.files[0]
   e.target.value=null
   this.imgsrc=""
   if(file){
     this.showbox=true
     this.file=file     
     const reader = new FileReader();
     reader.onload = e => this.imgsrc = reader.result;
     reader.readAsDataURL(file);
    }
  }
  selected(){
    this.showbox=false
  }
  close(){
    this.imgsrc=""
    this.file=null
   this.showbox=false
  }
    share(){
       if(this.file && this.text){
        this.imageUpload()
       }else if(this.file){
         this.imageUpload()
       }else if(this.text){
         this.saveToDb()
       }
    }
  imageUpload(){
    this.savingMsg="uploading..."
    this.saving=true
       const fd=new FormData();
        fd.append("file",this.file);  
        fd.append("upload_preset","equals")
        fd.append("cloud_name","shivraj-technology")
        this.savedImgurl="hhh"
       this._api.uploadToCloudinary(fd).subscribe((event:any)=>{   
         if(event.body){
           const image=event.body.url
          let s=image.split("/");
          this.savedImgurl="/"+s[s.length-2]+"/"+s[s.length-1]
           this.saveToDb()
         }
         
          if (event.type === HttpEventType.UploadProgress) {
                let progress = Math.round(100 * event.loaded / event.total);
                 this.uploadingProgress=progress;
                 if(progress===100){
                   this.uploadingProgress=0
                 }
               }
            });
  }

  saveToDb(){
    this.savingMsg="sharing...."
    this.saving=true
    var d={}
    if(this.savedImgurl && this.text){
      d={image:this.savedImgurl,text:this.text}
    }else if(this.text){
      d={text:this.text}
    }else if(this.savedImgurl){
       d={image:this.savedImgurl}
   }
    
    this._api.uploadPost(d).subscribe((res:any)=>{
      if(res.success){
        this.text=""
        this.savedImgurl=''
        this.saving=false
        this.savingMsg="shared successfully"
        this.close()
      }
    })
  }
  
}
