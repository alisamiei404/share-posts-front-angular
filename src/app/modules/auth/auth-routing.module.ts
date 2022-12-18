import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from 'src/app/guard/guest.guard';
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
