import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private _AllDataService:AllDataService,private _CartService:CartService){};
  ngOnInit(): void {
    this.showData();
  }
  products:any[] = [];
  showData(){
    this._AllDataService.getData('products').subscribe((data)=>{
      this.products = data.data;
    });
  }
  addToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartItems.next(response.numOfCartItems);
        if(response.status =="success"){
          Swal.fire({
            icon: 'success',
            text: response.message,
          })
        }
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
