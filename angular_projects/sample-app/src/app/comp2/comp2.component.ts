import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css'],
})
export class Comp2Component implements OnInit{
  constructor(private sampleService: SampleService, private router: Router){}
  ngOnInit(): void {
    console.log('User Name is - '+this.sampleService.getUserName());
  }

  comp1Click(){
    this.router.navigate(['/comp1']);
  }

}
