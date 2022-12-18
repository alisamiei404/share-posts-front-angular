import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthService } from "./auth.service ";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      var user: any = localStorage.getItem('user');
      if(user){
          const token = JSON.parse(user).token;
          const modifiedRequest = req.clone({headers: req.headers.append('Authorization', "Bearer "+token )});
          return next.handle(modifiedRequest).pipe(
              tap({
                  error: (error) => {
                    if(error.status == 401) {
                      localStorage.removeItem('user');
                      this.authService.isLoggedIn = false;
                      this.authService.user = null;
                      this.authService.isAdminIn = false;
                      this.router.navigate(['/auth/login']);
                    }
                    if(error.status == 404) {
                      this.router.navigate(['/not-found']);
                    }
                  }
              })); 
      }
        return next.handle(req); 
    }
}