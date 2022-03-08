import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  isLoading:boolean=true
  data:any=[]
  imageurl:string;
  constructor(private _api:ApiService) { 
    this.imageurl=_api.imageurl;
  }

  ngOnInit(): void {
    this._api.getNotification().subscribe((res:any)=>{
      if(res.success){
        this.isLoading=false
        this.data=res.data
        console.log(res.data);
        
      }
    })
  }

}
