import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css', '../../../home_style.css']
})
export class LeftmenuComponent implements OnInit {

  @Input('menu') menuName!: string;

  menu_items = [
    {'item': 'HOME', 'path':'/home', 'class':'inactive'},
    {'item': 'MENU', 'path':'/menu', 'class':'inactive'},
    {'item': 'ORDER', 'path':'/orders', 'class':'inactive'},
    {'item': 'ORDER HISTORY', 'path':'/orderhistory', 'class':'inactive'},
    {'item': 'ABOUT US', 'path':'/aboutus', 'class':'inactive'},
    {'item': 'CONTACT US', 'path':'/contactus', 'class':'inactive'}
  ]

  constructor(private router: Router){
    
  }

  ngOnInit() {
    console.log('scope is ' + this.menuName.toString());
    this.menu_items.forEach(element => {
      if(element.item===this.menuName){
        element.class='active';
      }
    });
    
  }

  clickOnMenuItem(path: string){
    this.router.navigate([path]);
  }

 
}