import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _AllDataService:AllDataService,private _CartService:CartService){};
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }
  Categories:any[] = [];
  Products:any[] = [];
  Brands:any[] = [];
  getCategories(){
    this._AllDataService.getData('categories').subscribe((response)=>{
      this.Categories = response.data;
    })
  }
  getProducts(){
    this._AllDataService.getData('products').subscribe((response)=>{
      this.Products = response.data;
    })
  }
  getBrands(){
    this._AllDataService.getData('brands').subscribe((response)=>{
      this.Brands = response.data.slice(0,4);
    })
  }
  // add to cart function
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
  // owl carusol library
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
