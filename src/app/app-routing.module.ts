import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[AuthGuardService]

},
{
  path:"home",
  loadChildren:  () => import('./Modules/home/home.module').then(m => m.HomeModule),
  canActivate:[AuthGuardService]
},
{
   path:'signup',
   component:SignupComponent,
   canActivate:[AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
