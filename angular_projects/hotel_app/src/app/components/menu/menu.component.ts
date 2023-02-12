import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpService, MenuItems } from 'src/app/services/http.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../../home_style.css'],
})
export class MenuComponent implements OnInit {

  veg_items: MenuItems[] = []
  NonVeg_items: MenuItems[] = []

  constructor(
    private orderService: OrderServiceService, 
    private httpService: HttpService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.httpService.getMenuData('Veg').pipe(take(1)).subscribe(res=>{
      this.veg_items = res;
    });
    this.httpService.getMenuData('Non-Veg').pipe(take(1)).subscribe(res=>{
      this.NonVeg_items = res;
    });
  }

  updateOrder(itemName: string, itemPrice: string){
    this.orderService.addToOrder(itemName, itemPrice);
    console.log(this.orderService.order_info);
    if(this.orderService.order_number===''){
      this.httpService.getNextOrderNumber().subscribe(res=>{
        console.log(res);
        this.orderService.order_number = res['status'];
      })
    }
  }


}
