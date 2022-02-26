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
  now:any;
  fileName: any;
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
 const date=new Date();
 this.now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
let file=this.croppedImageFile
 this.fileName=file.name;
 const fd=new FormData();
  fd.append("file",file,this.now+"-"+file.name);  
 this._api.uploadPost(fd).subscribe((event:any)=>{   
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
}
