import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  constructor(private _CartService:CartService){};
  ngOnInit(): void {
    this.getUserProducts()
  }

  products:any;
  totalPrice:number = 0;
  getUserProducts(){
    this._CartService.getUserProducts().subscribe({
      next:(response)=>{
        this._CartService.cartItems.next(response.numOfCartItems);
        this.products = response.data.products;
        this.totalPrice = response.data.totalCartPrice;
        console.log(response);

      },
      error:(error)=>{}
    })
  }
  removeItem(id:string){
    this._CartService.removeFromCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartItems.next(response.numOfCartItems);
        this.updateValues(response);
        console.log(response);
        Swal.fire({
          icon: 'success',
          text: "The item deleted successfully",
        })
      },
      error:(error)=>{
        console.log(error);

      }
    })
  }
  updateProductCount(count:number,id:string){
    if(count == 0){
      this.removeItem(id);
    }else{
      this._CartService.updateCount(count,id).subscribe({
        next:(response)=>{
          this.updateValues(response);
        },
        error:(error)=>{

        }
      })
    }
  }
  updateValues(response:any){
    this.products = response.data.products;
    this.totalPrice = response.data.totalCartPrice;
  }
}
