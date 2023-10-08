import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  Loading:boolean = false;
  errorMessage:string = '';
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router){};
  resetForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z]{1,3}[a-z]{1,3}[0-9]{4,9}')])
  });

  resetPassword(userData:FormGroup){
    this.Loading = true;
    this._AuthenticationService.resetPassword(userData.value).subscribe({
      next:(response)=>{
        this.Loading = false;
        this._Router.navigate(['signin']);
      },
      error:(error)=>{
        this.errorMessage = error.error.message;
        this.Loading = false;
      },
    });
  }
}
