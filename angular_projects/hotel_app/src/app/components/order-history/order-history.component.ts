import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService, OrderInfo } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css', '../../../home_style.css']
})
export class OrderHistoryComponent implements OnInit {

  order_history: OrderInfo[] = [];

  searchFormGroup: FormGroup = new FormGroup({
    orderFromDate : new FormControl(null),
    orderToDate : new FormControl(null),
    orderNumber : new FormControl(null, Validators.pattern(/^-?(0|[1-9]\d*)?$/))
  });

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    
  }

  onSearch(){
    console.log(this.searchFormGroup.controls['orderFromDate'].value);
    console.log(this.searchFormGroup.controls['orderToDate'].value);
    console.log(this.searchFormGroup.controls['orderNumber'].value);

    let fromDate = this.searchFormGroup.controls['orderFromDate'].value!=null?this.searchFormGroup.controls['orderFromDate'].value:'';
    let toDate = this.searchFormGroup.controls['orderToDate'].value!=null?this.searchFormGroup.controls['orderToDate'].value:'';
    let orNumber = this.searchFormGroup.controls['orderNumber'].value!=null?this.searchFormGroup.controls['orderNumber'].value:'';

    this.httpService.getOrderHistoryInfo(orNumber, fromDate, toDate).subscribe(res => {
      console.log(res);
      this.order_history = res;
    })
  }
}
