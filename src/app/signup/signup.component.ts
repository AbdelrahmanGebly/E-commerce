import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  Loading:boolean = false;
  errorMessage : string = '';
  constructor(private _AuthenticationService:AuthenticationService){};
registerForm:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z]{1,3}[a-z]{1,3}[0-9]{4,9}')]),
  rePassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,9}')]),
  phone:new FormControl(null,[Validators.required,Validators.pattern('^(002)?(01)[0125][0-9]{8}')]),
},{validators:this.checkRepasswordValue});

signUp(userData:FormGroup){
  this.Loading = true;
  this._AuthenticationService.signUp(userData.value).subscribe({
    next:(response)=>{
      this.Loading = false;},
    error:(error)=>{
      this.errorMessage = error.error.message;this.Loading = false;},
  });
}
checkRepasswordValue(form:any){
  let password = form.get('password');
  let rePassword = form.get('rePassword');
  if(password.value == rePassword.value) return null;
  else{
    rePassword.setErrors({rePasswordMatch:'repassword not matched'});
    return{rePasswordMach:'repassword not matched'};
  }
}
}

