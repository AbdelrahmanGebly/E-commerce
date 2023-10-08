import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllDataService } from '../services/all-data.service';
import { OwlOptions  } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id:any;
  productData:any;
  constructor(private _ActivatedRoute:ActivatedRoute,private _AllDataService:AllDataService,private _CartService:CartService){
    this._ActivatedRoute.paramMap.subscribe((param)=>{
      this.id = param.get('id')
    })
    this.getProductDetails();
  }
  getProductDetails(){
    this._AllDataService.getOneProduct(this.id).subscribe((response)=>{
      this.productData = response.data;
    })
  }
  addToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
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
