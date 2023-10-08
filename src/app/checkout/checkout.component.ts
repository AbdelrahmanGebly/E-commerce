import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private _CartService:CartService){};
  checkoutForm:FormGroup = new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern('^(002)?(01)[0125][0-9]{8}')]),
    city:  new FormControl(null,Validators.required)
  })
  ngOnInit(): void {
  }
  navigateToPage(url:string){
    window.location.href = url;
  }
  checkout(checkoutForm:FormGroup){
    this._CartService.handlePayment(this._CartService.cartId,checkoutForm.value).subscribe({
      next:(response)=>{
        if(response.status == 'success'){
          this.navigateToPage(response.session.url)
        }
      },
      error:(error)=>{console.log(error);
      }
    })
  }
}
