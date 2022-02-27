import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string="https://equals-api.herokuapp.com/api/v1"
  imageurl:string="https://equals-api.herokuapp.com"
  // url:string="http://localhost:3000/api/v1";
  // imageurl:string="http://localhost:3000";
  constructor(private _http:HttpClient) {
   }
    token(){
      return localStorage.getItem("token");
    }
    getUserInfo() {
      const token =localStorage.getItem("token");
      let payload;
      if (token) {
        payload = token.split(".")[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      } else {
        return [];
      }
    }

  login(data:any){
    return this._http.post(this.url+"/user/login",data);
  }
  signup(data:any){
    return this._http.post(this.url+"/user/signup",data,{headers:new HttpHeaders({"Authorization": "Bearer " + this.token()})})
  }
  uploadPost(data:any){
    return this._http.post(this.url+"/post/upload",data,{reportProgress:true,observe:'events',headers:new HttpHeaders({"Authorization": "Bearer " + this.token(),'ngsw-bypass': 'true'})})
  }
  uploadDp(data:any){
    return this._http.put(this.url+"/user/dp",data,{reportProgress:true,observe:'events',headers:new HttpHeaders({"Authorization": "Bearer " + this.token(),'ngsw-bypass': 'true'})})
  }
  uploadCover(data:any){
    return this._http.put(this.url+"/user/cover",data,{reportProgress:true,observe:'events',headers:new HttpHeaders({"Authorization": "Bearer " + this.token(),'ngsw-bypass': 'true'})})
  }
  uploadStory(data:any){
    return this._http.put(this.url+"/user/story",data,{reportProgress:true,observe:'events',headers:new HttpHeaders({"Authorization": "Bearer " + this.token(),'ngsw-bypass': 'true'})})
  }
  uploadTextStory(text:string){
    return this._http.put(this.url+"/user/story",{text},{headers:new HttpHeaders({"Authorization": "Bearer " + this.token()})})
  }


  unFollowedUsers(){
    return this._http.get(this.url+"/user/unfollowed",{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  follow(followerid:string,action:string){
    return this._http.put(this.url+"/user/follow",{followerid,action},{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  getSubPost(){
    return this._http.get(this.url+"/post/getsubpost",{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  getSubStories(){
    return this._http.get(this.url+"/user/getsubstories",{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  getUserStories(id:string){
    return this._http.get(this.url+"/user/getuserstories?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  getProfile(id:string){
    return this._http.get(this.url+"/user/profile?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  getFollowersOrFollowing(route:string,id:string){
    return this._http.get(this.url+"/user/"+route+"?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  getuserPost(id:string){
    return this._http.get(this.url+"/post/getuserposts?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  getSpecificPost(id:string){
    return this._http.get(this.url+"/post/getspecificpost?postid="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  getComments(id:string){
    return this._http.get(this.url+"/post/getcomments?postid="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  doReact(postid:string,action:string){
    return this._http.put(this.url+"/post/react",{postid,action},{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

  doComment(postid:string,comm:string){
    return this._http.put(this.url+"/post/comment",{postid,comm},{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
}
