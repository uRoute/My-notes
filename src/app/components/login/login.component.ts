import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading:boolean = false;
  login:Subscription = new Subscription();
  respoError:string = '';
  constructor(private _AuthServiceService:AuthServiceService,private _Router:Router){}
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,20}$/)])
  })

  ngOnInit(): void {
    console.log("initaited");
    
  }
  signIn(loginForm:FormGroup):void{
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.loading = true;
      this.login = this._AuthServiceService.signIn(this.loginForm.value).subscribe({
        next:(respo)=>{
          this.loading = false;
          localStorage.setItem('_UserToken',respo.token);
          this._AuthServiceService.saveToken()
          this._Router.navigate(['/home'])
          console.log(respo);
        },
        error:(err)=>{
          this.loading = false;
          console.log(err);  
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.login.unsubscribe();
  }

}
