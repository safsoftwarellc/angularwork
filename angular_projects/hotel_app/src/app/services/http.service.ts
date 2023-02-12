import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';


export interface UserInfo {
    'firstName': string,
    'lastName': string,
    'DOB': string,
    'gender': string,
    'email': string,
    'phone': string
}

export interface MenuItems {
    'name': string,
    'price': string
}

export interface OrderInfo {
    'sno': number,
    'orderNumber': number,
    'orderDate': string,
    'orderAmount': string
}

export interface StatusInfo {
    'status': string
}


@Injectable({
    providedIn: 'root'
})
export class HttpService{
    serverUri: string ='http://127.0.0.1:5000';

    constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string){}

    getUserInfo(userName: string){
        console.log(userName);
        return this.http.get<UserInfo>(this.serverUri+'/getUserInfo', {params: {userName: userName}});
    }

    getMenuData(menuType: string){
        console.log(menuType);
        return this.http.get<MenuItems[]>(this.serverUri+'/getMenu', {params: {menuType: menuType}});
    }

    getNextOrderNumber(){
        return this.http.get<StatusInfo>(this.serverUri+'/getNextOrderNumber');
    }

    createOrder(orderNumber: string, body: any){
        return this.http.post<StatusInfo>(this.serverUri+'/createOrder', body, {params: {orderNumber: orderNumber}});
    }

    postContactUsMessage(body: any){
        return this.http.post<StatusInfo>(this.serverUri+'/postContactUsMessage', body);
    }

    getAllOrdersInfo(){
        return this.http.get<any>(this.serverUri+'/getAllOrders');
    }

    getOrderHistoryInfo(orderNumber: string, dateFrom: string, dateTo: string){
        console.log(orderNumber);
        console.log(dateFrom);
        console.log(dateTo);
        return this.http.get<OrderInfo[]>(this.serverUri+'/getOrderHistory', 
            {params: 
                {
                    orderNumber: orderNumber,
                    dateFrom: this.changeDateFormat(dateFrom),
                    dateTo: this.changeDateFormat(dateTo)
                }
            });
    }

    changeDateFormat(date: string){
        if(date===''){
            return date;
        }
        return formatDate(date, 'MM/dd/yyyy', this.locale);
    }

}