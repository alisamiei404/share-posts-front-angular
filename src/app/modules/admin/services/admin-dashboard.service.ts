import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {
    url:string = "http://localhost:8000/api/admin";

    constructor(private http: HttpClient) {}

    getLogLogin(pageId: number) {
        let params = new HttpParams();
        params = params.append('pageId', pageId);
        return this.http.get(`${this.url}/logLogin`,{
            params: params
        });
    }

    getLogRequest(pageId: number) {
        let params = new HttpParams();
        params = params.append('pageId', pageId);
        return this.http.get(`${this.url}/logRequest`,{
            params: params
        });
    }
}