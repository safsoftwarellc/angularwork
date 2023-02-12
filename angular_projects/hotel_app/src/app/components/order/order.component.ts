import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, StatusInfo } from 'src/app/services/http.service';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { SampleService } from 'src/app/services/sample.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../../../home_style.css'],
})
export class OrderComponent implements OnInit{

  order_info: {'item': string, 'qty': number,  'price': string}[] = [];
  order_total_qty = 0;
  order_total_price = 0;
  order_sucess_message = '';
  order_number: string = '';

  constructor(private orderService: OrderServiceService, private httpService: HttpService,
    private router: Router) {}

    ngOnInit(): void {
      this.order_info = this.orderService.getOrderInfo();
      this.order_total_qty = this.orderService.getTotalQty();
      this.order_total_price = this.orderService.getTotalPrice();
      if(this.orderService.order_number===''){
        this.httpService.getNextOrderNumber().subscribe(res=>{
          console.log(res);
          this.orderService.order_number = res['status'];
        })
      }
      this.order_number = this.orderService.order_number;
      console.log(this.order_number);
    }


    onCancelOrder(){
      this.orderService.clear();
      this.order_info = [];
      this.order_total_qty = 0;
      this.order_total_price = 0;
      this.orderService.order_number = '';
    }

    onSubmitOrder(){
      if(this.orderService.getTotalQty()==0){
        return;
      }
      this.orderService.submitOrder().subscribe(res=>{
        console.log(res);
        this.order_sucess_message = res["status"];
      });
      this.order_info = [];
      this.order_total_qty = 0;
      this.order_total_price = 0;
      //this.order_sucess_message = "Order "+this.orderService.order_number+" Sucessfully Added to system!";
      this.orderService.order_number = '';
      this.orderService.clear();
    }

}
