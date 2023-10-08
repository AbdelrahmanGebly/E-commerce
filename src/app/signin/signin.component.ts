import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  Loading:boolean = false;
  errorMessage:string = '';
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router){};
  signinForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z]{1,3}[a-z]{1,3}[0-9]{4,9}')])
  });

  signIn(userData:FormGroup){
    this.Loading = true;
    this._AuthenticationService.signIn(userData.value).subscribe({
      next:(response)=>{
        if(response.message == "success") {
          this._Router.navigate(['/home']);
          localStorage.setItem('userToken',response.token);
          this._AuthenticationService.decodeUserData();
        }
        this.Loading = false;
      },
      error:(error)=>{
        this.errorMessage = error.error.message;
        this.Loading = false;
      },
    });
  }
}
