import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url:string = "http://localhost:8000/api";
    
    isLoggedIn: boolean = localStorage.getItem('user') ? true : false;
    u: any = localStorage.getItem('user');
    user: any = localStorage.getItem('user') ? JSON.parse(this.u) : null;
    isAdminIn: boolean = this.user ? this.user.type === 'admin' ? true : false : false;

    constructor(private http: HttpClient) {}

    public isAuthenticated() {
        return new Promise((resolve, reject) => {
            resolve(this.isLoggedIn);
        });
    }

    public isAdmin() {
        return new Promise((resolve, reject) => {
            resolve(this.isAdminIn);
        });
    }

    register(p: any) {
        return this.http
        .post(
            `${this.url}/register`,
            p
        );
    }

    login(p: any) {
        return this.http
        .post(
            `${this.url}/login`,
            p
        );
    }

    logout() {
        return this.http
        .post(`${this.url}/logout`,{});
    }

    me() {
        return this.http.get(`${this.url}/me`);
    }

    checkAdmin() {
        return this.http.get(`${this.url}/checkAdmin`);
    }
}