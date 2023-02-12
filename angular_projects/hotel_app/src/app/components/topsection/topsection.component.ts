import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topsection',
  templateUrl: './topsection.component.html',
  styleUrls: ['./topsection.component.css']
})
export class TopsectionComponent {

  constructor(private authService:AuthService, private router: Router) {}

  logout(){
    this.authService.logout();
    console.log('Logout');
    this.router.navigate(['/login']);
  }

  goToProfile(){
    console.log('Profile');
    this.router.navigate(['/profile']);
  }

}
