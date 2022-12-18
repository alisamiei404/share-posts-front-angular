import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service ";
import { PostsService } from "src/app/service/posts.service";
import { AdminPostService } from "../../services/admin-post.service";

@Component({
    selector: 'app-admin-user-posts',
    templateUrl: './admin-user-posts.component.html'
})
export class AdminUserPostsComponent implements OnInit, OnDestroy {

    loading: boolean = false;
    posts: any;
    userId: number = 0;
    countPage: number = 0;
    activePage: number = 0;
    pageId!: number;
    status!: number;
    fakeArray: any;
    disable: boolean = false;
    postId: number = 0;
    slug!: string;
    paramsSub!: Subscription;
    itemSub!: Subscription;
    statusItemSub!: Subscription;
    deleteItemSub!: Subscription;

    
    constructor(private adminPostService: AdminPostService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.status = 3;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;
            this.postId = 0;
            this.slug = p['slug'];

            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            this.status = isNaN(+p['status']) || +p['status'] < 0 ? 3 : +p['status'];
            
            this.itemSub = this.adminPostService.getPostsUser(this.slug, this.pageId, this.status).subscribe((res:any) => {
                this.loading = false;
                this.countPage = res.countPage;
                if(this.pageId > this.countPage && this.countPage !== 0){
                this.router.navigate(['/not-found']);
                }
                this.fakeArray = new Array(this.countPage);
                this.posts = res.posts;
            });
        });
    }

    changeStatus(slug: string, status: number, id: number){
        this.disable = true;
        this.statusItemSub = this.adminPostService.changeStatuPost(slug, status).subscribe(res => {
            this.disable = false;
            this.postId = id;
        });
    }

    onDelete(slug: string, id: number){
        this.disable = true;
        this.deleteItemSub = this.adminPostService.deletePost(slug).subscribe(res => {
            this.disable = false;
            this.postId = id;
        });
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
        if(this.statusItemSub) { this.statusItemSub.unsubscribe(); }
        if(this.deleteItemSub) { this.deleteItemSub.unsubscribe(); }
    }
}