import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{
  loading:boolean = false;
  signUp:Subscription = new Subscription();
  emailExist:string = ''
  constructor(private _AuthServiceService:AuthServiceService,private _Router:Router){}
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,20}$/)]),
    age: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  ngOnInit(): void {
    console.log("initaited");
    
  }
  register(registerForm:FormGroup):void{
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.loading = true;
      this.signUp = this._AuthServiceService.signUp(this.registerForm.value).subscribe({
        next:(respo)=>{
          this.loading = false;
          this._Router.navigate(['/login'])
          console.log(respo);
        },
        error:(err)=>{
          this.loading = false;
          this.emailExist = err.error.msg
          console.log(err.error.msg);  
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.signUp.unsubscribe();
  }
}
