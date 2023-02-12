import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      let url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): UrlTree | true {
    console.log("URL - "+url);
    const val= localStorage.getItem('isUserLoggedIn')
    if(val!=null && val == "true"){
      if(url=='/login')
        this.router.parseUrl("/home")
      else
        return true
    }
    return this.router.parseUrl('/login');
  }
  
}
