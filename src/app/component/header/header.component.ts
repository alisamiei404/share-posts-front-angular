import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service ';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  name: string = '';
  IsShowMenu: boolean = false;
  authSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdminIn;
    this.name = this.isLoggedIn ? this.authService.user.name : '';
  }


  showMenu() {
    this.IsShowMenu = !this.IsShowMenu;
  }

  logout(){
    this.authSub = this.authService.logout().subscribe(res=>{
      localStorage.removeItem('user');
      this.authService.isLoggedIn = false;
      this.authService.user = null;
      this.authService.isAdminIn = false;
      this.isLoggedIn = false;
      this.router.navigate(['/auth/login']);
    }, error => {
      this.isLoggedIn = false;
    })
  }

  ngOnDestroy(): void {
    if(this.authSub) { this.authSub.unsubscribe(); }
  }

}
