import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;

  login(userName: string, password: string): boolean {
    console.log(userName);
    console.log(password);

    this.isUserLoggedIn = userName == 'admin' && password == 'password';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
    localStorage.setItem('userName', this.isUserLoggedIn ? userName : '');

    return this.isUserLoggedIn;
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn'); 
    localStorage.removeItem('userName'); 
  }
 

  constructor() { }
}
