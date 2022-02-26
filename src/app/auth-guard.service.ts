import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
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
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if i am logged in and i m on login page or register send me to home
      if(localStorage.getItem("token")){
        if(route.url.toString()=="" || route.url.toString()=="signup"){
          this.router.navigate(['/home']);
          return false
        }
        return true
      }
       // if i am "NOT" logged in and i m on login page or register let me stay

      if(route.url.toString()=="" || route.url.toString()=="signup"){
        return true;
      }
     
          // if i am "NOT" logged in and i m on any othr route then send me to login page

      this.router.navigate(['/']);
      return false;
  }
}
