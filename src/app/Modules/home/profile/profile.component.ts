import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ImageCroppedEvent,base64ToFile } from 'ngx-image-cropper';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:any;
  userdata:any;
  data:any;
  imageurl:string=""
  showdp:boolean=false;
  showcover:boolean=false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgUploaded: any;
  croppedImageFile: any='';
  uploading: boolean=false;

  cimageChangedEvent: any = '';
  ccroppedImage: any = '';
  cimgUploaded: any;
  ccroppedImageFile: any='';
  cuploading: boolean=false;

  now:any;
  fileName: any;
  uploadingProgress: number=0;
  constructor(private _api:ApiService,private _route:ActivatedRoute) { 
    // this.id=this._route.snapshot.paramMap.get('id');
    _route.paramMap.subscribe((p:any)=>{
      this.id=p.get('id')
      this.loadData()
      this.userdata=_api.getUserInfo()
      this.imageurl=_api.imageurl
    })
  }

  ngOnInit(): void {
   
  }
   
  loadData(){
    this._api.getProfile(this.id).subscribe((data:any)=>{
      if(data.success){
        this.data=data.data
      }
    })
  }

    showDp(){
      this.showdp=!this.showdp;
    }
    showCover(){
      this.showcover=!this.showcover;
    }
    cancel():void{
      this.imageChangedEvent='';
      this.cimageChangedEvent='';
    }

    dpUpload(event:any){
      this.imgUploaded=null;
      this.imageChangedEvent=event;
     }
     coverUpload(event:any){
      this.cimgUploaded=null;
      this.cimageChangedEvent=event;
     }
     
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      
      this.croppedImageFile = base64ToFile(this.croppedImage);
      this.croppedImageFile.lastModifiedDate = new Date();
      this.croppedImageFile.name =this.imageChangedEvent.target.files[0].name;
   }

   cimageCropped(event: ImageCroppedEvent) {
    this.ccroppedImage = event.base64;
    
    this.ccroppedImageFile = base64ToFile(this.ccroppedImage);
    this.ccroppedImageFile.lastModifiedDate = new Date();
    this.ccroppedImageFile.name =this.cimageChangedEvent.target.files[0].name;
 }


   share():void{
    this.uploading=true;
   const date=new Date();
   this.now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
  let file=this.croppedImageFile
   this.fileName=file.name;
   const fd=new FormData();
    fd.append("file",file,this.now+"-"+file.name);  
   this._api.uploadDp(fd).subscribe((event:any)=>{   
     if(event.body){
      this.data.dp=event.body.data.dp;
       this.now=""
       this.fileName=""
     }
     
      if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round(100 * event.loaded / event.total);
            this.uploadingProgress=progress;
              if(progress==100){
               this.cancel();
               this.uploading=false;
               this.uploadingProgress=0;
               this.imgUploaded="Shared successfully...";
              }
           }
        });
  }


  cshare():void{
    this.cuploading=true;
   const date=new Date();
   this.now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
  let file=this.ccroppedImageFile
   this.fileName=file.name;
   const fd=new FormData();
    fd.append("file",file,this.now+"-"+file.name);  
   this._api.uploadCover(fd).subscribe((event:any)=>{   
     if(event.body){
      this.data.cover=event.body.data.cover;
      this.now=""
      this.fileName=""
     }
     
      if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round(100 * event.loaded / event.total);
            this.uploadingProgress=progress;
              if(progress==100){
               this.cancel();
               this.cuploading=false;
               this.uploadingProgress=0;
               this.imgUploaded="Shared successfully...";
              }
           }
        });
  }


  follow(id:string,e:any){
    e.target.disabled=true
    let text=e.target.innerText;
    if(text.toLowerCase()==="follow"){
      this._api.follow(id,"follow").subscribe((data:any)=>{
        if(data.success){
          e.target.disabled=false
          e.target.innerText="unfollow"
          this.data.followers++;
        }
      })
    }else if(text.toLowerCase()==='unfollow'){
      this._api.follow(id,"unfollow").subscribe((data:any)=>{
        if(data.success){
          e.target.disabled=false
          e.target.innerText="follow"
          this.data.followers--;
        }
      })
    }
    
  }

}
