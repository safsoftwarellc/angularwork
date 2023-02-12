import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private httpService: HttpService){}

  order_info: {'item': string, 'qty': number,  'price': string}[] = [];
  order_total_qty = 0;
  order_total_price = 0;
  order_number = '';
        
  addToOrder(item: string, price: string){
    let itemFound: boolean = false;
    for(let i=0; i<this.order_info.length; i++){
      if(this.order_info[i].item == item){
        this.order_info[i].qty = this.order_info[i].qty+1;
        itemFound = true;
        break;
      }
    }
    if(!itemFound){
      this.order_info.push({'item': item,'qty': 1,  'price': price});
    }
    this.addTotal()
  }

  addTotal(){
    let qty: number = 0;
    let price: number = 0;
    
    for(let i=0; i<this.order_info.length; i++){
      qty = qty + this.order_info[i].qty;
      price = price + (Number(this.order_info[i].price.replace(/[^0-9.-]+/g,"")) * qty);
    }
    this.order_total_qty = qty;
    this.order_total_price = price;
    //this.order_info.push({'item': "Total",'qty': qty,  'price': '$'+price});
  }

  clear(){
    this.order_info = [];
    this.order_total_qty = 0;
    this.order_total_price = 0;
  }

  getOrderInfo(){
    return this.order_info;
  }

  getTotalQty(){
    return this.order_total_qty;
  }
  getTotalPrice(){
    return this.order_total_price
  }

  submitOrder(){
    this.order_info.push({'item': "Total",'qty': this.order_total_qty,  'price': '$'+this.order_total_price});
    return this.httpService.createOrder(this.order_number, this.order_info);
  }


}

