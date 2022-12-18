import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    url:string = "http://localhost:8000/api";

    constructor(private http: HttpClient) {}

    numberPageInHome: number = 1;
    countPageInHome: number = 1;
    postsInHome: any = [];

    getPosts(pageId: number) {
        let params = new HttpParams();
        params = params.append('pageId', pageId);
        return this.http.get(`${this.url}/posts`,{
            params: params
        });
    }

    getMyPosts(pageId: number) {
        let params = new HttpParams();
        params = params.append('pageId', pageId);
        return this.http.get(`${this.url}/myposts`,{
            params: params
        });
    }

    getPost(slug: string) {
        return this.http.get(`${this.url}/posts/${slug}`);
    }

    addPost(postData: any) {
        var user: any = localStorage.getItem('user');
        return this.http
        .post(
            `${this.url}/posts`,
            postData
        );
    }

    editPost(slug: string) {
        return this.http
        .post(`${this.url}/posts/${slug}`,{});
    }

    updatePost(slug: string, postData: any) {
        return this.http
        .put(
            `${this.url}/posts/${slug}`,
            postData);
    }

    deletePost(slug: string | undefined) {
        return this.http.delete(`${this.url}/posts/${slug}`);
    }
}