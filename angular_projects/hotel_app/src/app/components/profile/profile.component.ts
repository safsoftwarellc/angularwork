import { Component, OnInit } from '@angular/core';
import { HttpService, UserInfo } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../home_style.css']
})
export class ProfileComponent implements OnInit {

  profile: UserInfo = {
    firstName: '',
    lastName: '',
    DOB: '',
    gender: '',
    email: '',
    phone: ''
  }

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    let user: string;
    user = userName?userName:'';
    
    this.httpService.getUserInfo(user).subscribe(res=>{
      console.log(res);
      this.profile = res;
    })
  }

}
