import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private _AuthServiceService:AuthServiceService){}
  loginFlag:boolean = false
  ngOnInit(): void {
    this._AuthServiceService.userToken.subscribe({
      next:()=>{
        if(this._AuthServiceService.userToken.getValue()!=null){
          this.loginFlag = true
        }else{
          this.loginFlag = false
        }
      }
    })
  }

  logOut():void{
    this._AuthServiceService.signOut();
  }
}
