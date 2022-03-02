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
  isLoading:boolean=true
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
  uploadingProgress: number=0;
  constructor(private _api:ApiService,private _route:ActivatedRoute) { 
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
        this.isLoading=false
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

  


  share():void{
    this.uploading=true;
    let file=this.croppedImageFile
   const fd=new FormData();
    fd.append("file",file); 
    fd.append("upload_preset","equals")
    fd.append("cloud_name","shivraj-technology")
 
   this._api.uploadToCloudinary(fd).subscribe((event:any)=>{   
     if(event.body){
      let s=event.body.url.split("/");
      let name="/"+s[s.length-2]+"/"+s[s.length-1]
      this._api.uploadDp(name).subscribe((res:any)=>{
        if(res.success){
          this.data.dp=res.data.dp;
          this.cancel();
          this.uploading=false;
          this.showdp=false;
          this.uploadingProgress=0;
          this.imgUploaded="Shared successfully...";
        }
      })
      
      
     }
     
      if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round(100 * event.loaded / event.total);
            this.uploadingProgress=progress;
           }
        });
  }


  cshare():void{
    this.cuploading=true;
    let file=this.ccroppedImageFile
   const fd=new FormData();
    fd.append("file",file);  
    fd.append("upload_preset","equals")
    fd.append("cloud_name","shivraj-technology")
   this._api.uploadToCloudinary(fd).subscribe((event:any)=>{   
     if(event.body){
      let s=event.body.url.split("/");
      let name="/"+s[s.length-2]+"/"+s[s.length-1]
      this._api.uploadCover(name).subscribe((res:any)=>{
        this.data.cover=res.data.cover;
        this.cancel();
        this.cuploading=false;
        this.uploadingProgress=0;
        this.showcover=false;
      })
     }
     
      if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round(100 * event.loaded / event.total);
            this.uploadingProgress=progress;
           }
        });
  }

}
