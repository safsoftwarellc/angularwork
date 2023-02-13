import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  userName!: string;
  password!: string;

  formValid: boolean = true;

  constructor(private router: Router, private authService: AuthService){
    
  }
  ngOnInit(): void {
    console.log('URL is - ${API_URL}');
  }



  onSubmit(){
    if(this.authService.login(this.userName, this.password)){
      this.router.navigate(['/home']);
    }else{
      this.loginForm.form.controls['username'].setErrors({'incorrect': true});
      this.router.navigate(['.']);
    }
  }

}
