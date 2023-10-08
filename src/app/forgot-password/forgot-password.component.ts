import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  successMessage:string = '';
  failMessage:string = '';
  invalidCodeStatus:string = '';
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router){};
  forgotForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });
  verifyForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  });
  forgotPassword(form:FormGroup){
    this._AuthenticationService.forgotPassword(form.value).subscribe({
      next:(response)=>{
        this.successMessage = response.message;
        this.failMessage = '';
        document.querySelector('.forgotPassword')?.classList.add('d-none');
        document.querySelector('.verifyCode')?.classList.remove('d-none');
      },
      error:(error)=>{
        this.failMessage = error.error.message;
      }
    });
  }
  verifyCode(form:FormGroup){
    this._AuthenticationService.verifyCode(form.value).subscribe({
      next:(response)=>{
        if(response.status == 'Success'){
          this._Router.navigate(['resetPassword']);
        }
      },
      error:(error)=>{
        this.invalidCodeStatus = 'Invalid Code';
      }
    });
  }
}
