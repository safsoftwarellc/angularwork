import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, 
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
  {path: 'menu', component: MenuComponent, canActivate: [LoginGuard]},
  {path: 'orders', component: OrderComponent, canActivate: [LoginGuard]},
  {path: 'orderhistory', component: OrderHistoryComponent, canActivate: [LoginGuard]},
  {path: 'aboutus', component: AboutusComponent, canActivate: [LoginGuard]},
  {path: 'contactus', component: ContactusComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
