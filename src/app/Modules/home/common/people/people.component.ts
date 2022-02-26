import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @Input() user:any;
  myid:any;
  imageurl:any;
  constructor(private _api:ApiService) {
    this.imageurl=_api.imageurl
    this.myid=_api.getUserInfo().id
   }

  ngOnInit(): void {

  }

  follow(id:string,e:any){
    e.target.disabled=true
    let text=e.target.innerText;
    if(text.toLowerCase()==="follow"){
      this._api.follow(id,"follow").subscribe((data:any)=>{
        if(data.success){
          e.target.disabled=false
          e.target.innerText="unfollow"
          this.user.followers++;
        }
      })
    }else if(text.toLowerCase()==='unfollow'){
      this._api.follow(id,"unfollow").subscribe((data:any)=>{
        if(data.success){
          e.target.disabled=false
          e.target.innerText="follow"
          this.user.followers--;
        }
      })
    }
    
  }


}
