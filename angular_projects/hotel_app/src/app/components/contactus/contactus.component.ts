import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css', '../../../home_style.css']
})
export class ContactusComponent implements OnInit {


  contactUsForm: FormGroup =new FormGroup({
    'from': new FormControl(null, [Validators.required, Validators.email]),
    'subject': new FormControl(null, Validators.required),
    'message': new FormControl(null, Validators.required)
  });

  message: string = '';
  messageSuccess: string = '';

  constructor(private httpService: HttpService){}
  
  ngOnInit(): void {
    
  }

  onFormSubmit(){
    
    this.message = this.contactUsForm.valid?'':'Data is not Valid!';
    if(this.message!='') return;
    console.log(this.contactUsForm);
    console.log(this.contactUsForm.controls['from'].value);
    console.log(this.contactUsForm.controls['subject'].value);
    console.log(this.contactUsForm.controls['message'].value);

    this.httpService.postContactUsMessage({
      'from':this.contactUsForm.controls['from'].value,
      'subject':this.contactUsForm.controls['subject'].value,
      'message':this.contactUsForm.controls['message'].value
    }).subscribe(res=>{
      console.log(res);
      this.messageSuccess = res["status"];
    })
    this.contactUsForm.reset();
  }

}
