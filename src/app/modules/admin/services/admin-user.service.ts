import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminUserService {
    url:string = "http://localhost:8000/api/admin";

    constructor(private http: HttpClient) {}

    getUsers(pageId: number) {
        let params = new HttpParams();
        params = params.append('pageId', pageId);
        return this.http.get(`${this.url}/users`,{
            params: params
        });
    }

    changeStatuUser(slug: string | undefined) {
        return this.http.put(`${this.url}/users/updateStatus/${slug}`, {});
    }

    deleteUser(slug: string | undefined) {
        return this.http.delete(`${this.url}/users/${slug}`);
    }
}