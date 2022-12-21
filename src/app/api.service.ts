import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // cache
  public responseCache = new Map();
  // cache end

  // url: string = "https://equals-api.onrender.com/v1"
  // socket_url: string = "https://equals-api.onrender.com"

  url: string = "http://localhost:5000/v1";
  socket_url: string = "http://localhost:5000"

  imageurl: string = "https://res.cloudinary.com/shivraj-technology/image/upload";
  upurl: string = "https://api.cloudinary.com/v1_1/shivraj-technology/image/upload"
  constructor(private _http: HttpClient) { }
  token() {
    return localStorage.getItem("token");
  }
  getUserInfo() {
    const user = localStorage.getItem("user");
    if (user) {
      const d = JSON.parse(user);
      return d
    } else {
      return [];
    }
  }


  combinedId(userid: string) {
    const myId = this.getUserInfo().id
    return myId > userid ? myId + "-" + userid : userid + "-" + myId
  }

  login(data: any) {
    return this._http.post(this.url + "/auth/login", data);
  }
  signup(data: any) {
    return this._http.post(this.url + "/auth/signup", data)
  }
  varifyOtp(data: any) {
    return this._http.post(this.url + "/auth/varify-otp", data)
  }

  getSubPost(start: number) {
    const purl = this.url + "/post/getsubpost?skip=" + start + "&id=" + this.getUserInfo().id
    const postsFromCache = this.responseCache.get(purl);
    const nowdate = Date.now()
    if (postsFromCache && (nowdate - postsFromCache.date) < 86400000) {
      return of(postsFromCache);
    }
    const response = this._http.get<any>(purl, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) });
    response.subscribe((posts: any) => {
      posts.date = Date.now()
      this.responseCache.set(purl, posts)
    })
    return response;
    // return this._http.get(this.url+"/post/getsubpost?start="+start,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  deletePost(id: string) {
    return this._http.delete(this.url + "/post/delete-post?postid=" + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  getProfile(id: string) {
    const profileurl = this.url + "/user?id=" + id
    const profileFromCache = this.responseCache.get(profileurl);
    const nowdate = Date.now()
    if (profileFromCache && (nowdate - profileFromCache.date) < 3600000) {
      return of(profileFromCache);
    }
    const response = this._http.get<any>(profileurl, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) });
    response.subscribe((profile: any) => {
      profile.date = Date.now()
      this.responseCache.set(profileurl, profile)
    })
    return response;
    // return this._http.get(this.url+"/user/profile?id="+id,{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
  doReact(postid: string, action: string, postedby: string) {
    return this._http.put(this.url + "/post/react", { postid, action, postedby }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  doReactOnComment(postid: string, route: string, commid: string) {
    return this._http.put(this.url + "/post/comment/" + route, { postid, commid }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  doComment(postid: string, comm: string, postedby: string) {
    return this._http.put(this.url + "/post/comment", { postid, comm, postedby }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  getuserPost(id: string, start: number) {
    return this._http.get(this.url + "/post/getuserposts?id=" + id + "&skip=" + start, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  uploadToCloudinary(data: any) {
    return this._http.post(this.upurl, data, { reportProgress: true, observe: 'events' })
  }
  uploadPost(data: any) {
    return this._http.post(this.url + "/post/upload", data, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  liveSearch(searchstring: string) {
    return this._http.get(this.url + "/user/search?name=" + searchstring, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  getSpecificPost(id: string) {
    return this._http.get(this.url + "/post/getspecificpost?id=" + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  uploadDp(dp: string) {
    return this._http.patch(this.url + "/user/updatedp", { dp }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  uploadCover(cover: string) {
    return this._http.patch(this.url + "/user/updatecover", { cover }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  getComments(id: string, skip: number) {
    return this._http.get(this.url + "/post/comment?id=" + id + "&skip=" + skip, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  follow(to: string, action: string) {
    return this._http.post(this.url + "/follow", { to, action }, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  getFollowersOrFollowing(route: string, id: string, skip: number) {
    return this._http.get(this.url + "/follow/" + route + "?id=" + id + "&skip=" + skip, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }

  unFollowedUsers(skip: number) {
    return this._http.get(this.url + "/user/discover-people?skip=" + skip, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }


  editUserDetails(data: any) {
    return this._http.patch(this.url + "/user/edit", data, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }


  sendMessage(data: any) {
    return this._http.post(this.url + "/message", data, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }
  getMessage(id: string, skip: number) {
    return this._http.get(this.url + "/message/" + id + "?skip=" + skip, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }








  deleteUser() {
    return this._http.delete(this.url + "/user", { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) })
  }










  getNotification() {
    const nurl = this.url + "/notification?id=" + this.getUserInfo().id
    const notificationFromCache = this.responseCache.get(nurl);
    const nowdate = Date.now()
    if (notificationFromCache && (nowdate - notificationFromCache.date) < 86400000) {
      return of(notificationFromCache);
    }
    const response = this._http.get<any>(nurl, { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token() }) });
    response.subscribe((posts: any) => {
      posts.date = Date.now()
      this.responseCache.set(nurl, posts)
    })
    return response;
    // return this._http.get(this.url+"/notification",{headers:new HttpHeaders({"Authorization":"Bearer "+this.token()})})
  }
}
