import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string="https://equals-api.herokuapp.com/api/v2"
  // url:string="http://localhost:3000/api/v2";
  imageurl:string="https://res.cloudinary.com/shivraj-technology/image/upload";
  upurl:string="https://api.cloudinary.com/v1_1/shivraj-technology/image/upload"
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
  

  uploadToCloudinary(data:any){
    return this._http.post(this.upurl,data,{reportProgress:true,observe:'events'})
  }
  uploadPost(data:any){
    return this._http.post(this.url+"/post/upload",data,{headers:new HttpHeaders({"Authorization": "Bearer " + this.token()})})
  }
  uploadDp(dp:string){
    return this._http.put(this.url+"/user/dp",{dp},{headers:new HttpHeaders({"Authorization": "Bearer " + this.token()})})
  }
  uploadCover(cover:string){
    return this._http.put(this.url+"/user/cover",{cover},{headers:new HttpHeaders({"Authorization": "Bearer " + this.token()})})
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

  liveSearch(searchstring:string){
    return this._http.get(this.url+"/user?searchstring="+searchstring,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }

   deletePost(id:string){
    return this._http.delete(this.url+"/post?postid="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  

  getProfile(id:string){
    return this._http.get(this.url+"/user/profile?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  deleteUser(){
    return this._http.delete(this.url+"/user",{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  editUserDetails(data:any){
    return this._http.patch(this.url+"/user",data,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
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
