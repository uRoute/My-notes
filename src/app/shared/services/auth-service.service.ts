import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  userToken = new BehaviorSubject(null) ;
  saveToken():void{
    if(localStorage.getItem('_UserToken')!=null){
      let userEncoded:any = localStorage.getItem('_UserToken');
      let userDecoded:any = jwtDecode(userEncoded);
      this.userToken.next(userDecoded)
      console.log(this.userToken);
    }
  }

  signUp(form:object):Observable<any>{
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,form)
  }

  signIn(form:object):Observable<any>{
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,form)
  }

  signOut():void{
    localStorage.removeItem('_UserToken');
    this.userToken.next(null)
    this._Router.navigate(['/login']);
  }

}
