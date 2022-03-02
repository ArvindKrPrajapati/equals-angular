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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgUploaded: any;
  croppedImageFile: any='';
  uploading: boolean=false;
  uploadingProgress: number=0;
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
  }
  postUpload(event:any){
    this.imgUploaded=null;
    this.imageChangedEvent=event;
   }
   
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
    this.croppedImageFile = base64ToFile(this.croppedImage);
    this.croppedImageFile.lastModifiedDate = new Date();
    this.croppedImageFile.name =this.imageChangedEvent.target.files[0].name;
 }

 cancel():void{
  this.imageChangedEvent='';
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
       this.saveToDb(event.body.url)
     }
     
      if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round(100 * event.loaded / event.total);
             this.uploadingProgress=progress;
           }
        });
  }

  saveToDb(image:string){
    let s=image.split("/");
    let name="/"+s[s.length-2]+"/"+s[s.length-1]
    this._api.uploadPost(name).subscribe((res:any)=>{
      if(res.success){
        this.cancel();
        this.uploading=false;
        this.uploadingProgress=0;
        this.imgUploaded="Shared successfully...";
      }
    })
  }
  
}
