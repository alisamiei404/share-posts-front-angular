import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service ";

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnDestroy {
    IsShowMenu: boolean = false;
    authSub!: Subscription;
    d = new Date();


    constructor(private authService: AuthService, private router: Router){}

    showMenu() {
      this.IsShowMenu = !this.IsShowMenu;
    }   

    logout(){
        this.authSub = this.authService.logout().subscribe(res=>{
            localStorage.removeItem('user');
            this.authService.isLoggedIn = false;
            this.authService.user = null;
            this.authService.isAdminIn = false;
            this.router.navigate(['/auth/login']);
        });
    } 

    ngOnDestroy(): void {
        if(this.authSub) { this.authSub.unsubscribe(); }
    }
}