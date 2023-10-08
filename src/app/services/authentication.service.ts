import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) {
    (localStorage.getItem('userToken'))?this.decodeUserData():'';
  }
  decodeUserData(){
    let encodedUserToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserToken));
  }
  signUp(data:any[]):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data);
  }
  signIn(data:any[]):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data);
  }
  forgotPassword(data:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }
  verifyCode(data:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }
  resetPassword(data:any):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  }
}
