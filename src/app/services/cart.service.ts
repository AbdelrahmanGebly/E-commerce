import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  baseUrl:string = "https://ecommerce.routemisr.com";
  headers:any={
    token:localStorage.getItem('userToken'),
  };
  cartItems = new BehaviorSubject(0);
  cartId:string = '';
  constructor(private _HttpClient:HttpClient){
    this.getUserProducts().subscribe({
      next:(response)=>{this.cartItems.next(response.numOfCartItems),this.cartId = response.data._id}
    })
  };
  ngOnInit(): void {

  }
  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
    {
      productId : id,
    },
    {
      headers:this.headers,
    })
  }
  removeFromCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`,
    {
      headers:this.headers,
    })
  }
  getUserProducts():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
    {
      headers:this.headers,
    })
  }
  updateCount(count:number,id:string):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${id}`,
    {
      count : count,
    },
    {
      headers:this.headers,
    })
  }
  handlePayment(id:string,userData:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
      shippingAddress : userData,
    },
    {
      headers:this.headers,
    })
  }
}
