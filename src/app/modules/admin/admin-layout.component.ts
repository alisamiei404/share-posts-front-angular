import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service ";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
    authSub!: Subscription;
    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
        this.authSub = this.authService.checkAdmin().subscribe((res) => {
            if(res == 1){
                this.authService.isAdminIn = true;
            }else{
                this.authService.isLoggedIn = false;
                this.authService.isAdminIn = false;
                this.authService.user = null;
                localStorage.removeItem('user');
                this.router.navigate(['/']);
            }
        });
        
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
}