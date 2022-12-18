import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminPostService {
    url:string = "http://localhost:8000/api/admin";
    countItem: number = 5;

    constructor(private http: HttpClient) {}

    getPosts(pageId: number, status: number) {
        let params = new HttpParams();
        params = params.append('count', this.countItem);
        params = params.append('pageId', pageId);
        params = params.append('status', status);
        return this.http.get(`${this.url}/posts`,{
            params: params
        });
    }

    getPostsUser(slug: string, pageId: number, status: number) {
        let params = new HttpParams();
        params = params.append('slug', slug);
        params = params.append('pageId', pageId);
        params = params.append('status', status);
        return this.http.get(`${this.url}/postsUser`,{
            params: params
        });
    }

    getPost(slug: string) {
        return this.http.get(`${this.url}/posts/${slug}`);
    }

    changeStatuPost(slug: string, status: number) {
        let params = new HttpParams();
        params = params.append('slug', slug);
        params = params.append('status', status);
        return this.http.put(`${this.url}/posts/updateStatus`, {}, {
            params: params
        });
    }

    deletePost(slug: string | undefined) {
        return this.http.delete(`${this.url}/posts/${slug}`);
    }
}