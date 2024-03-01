import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuardGuard } from './shared/services/auth-guard.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,title:'Home',canActivate:[authGuardGuard]},
  {path:'login',component:LoginComponent,title:'My-Notes'},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'**',component:NotFoundComponent,title:'Not-Found 404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
