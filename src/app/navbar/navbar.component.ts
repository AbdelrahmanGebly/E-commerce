import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean = false;
  numOfCartItems:any;
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router,private _CartService:CartService){
    this._AuthenticationService.userData.subscribe({
      next:()=>{
        (_AuthenticationService.userData.getValue() == null)? this.isLogin = false:this.isLogin = true;
      }
    });
    this._CartService.cartItems.subscribe({
      next:(response)=>{this.numOfCartItems = response}
    })
  };
  ngOnInit(): void {

  }

  logOut(){
    localStorage.removeItem('userToken');
    this._AuthenticationService.userData.next(null);
    this._Router.navigate(['/signin']);
  }

}
