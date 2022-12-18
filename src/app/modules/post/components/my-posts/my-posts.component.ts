import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PostsService } from "src/app/service/posts.service";

@Component({
    selector: 'app-my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    posts: any;
    userId: number = 0;
    countPage: number = 0;
    activePage: number = 0;
    pageId!: number;
    fakeArray: any;
    disable: boolean = false;
    postId: number = 0;
    private itemSub!: Subscription;
    private paramsSub!: Subscription;
    private deleteItemSub!: Subscription;

    constructor(private postService: PostsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;
            this.postId = 0;

            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            
            this.itemSub = this.postService.getMyPosts(this.pageId).subscribe((res:any) => {
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

    onDelete(slug: string, id: number){
        this.disable = true;
        this.deleteItemSub = this.postService.deletePost(slug).subscribe(res => {
            this.disable = false;
            this.postId = id;
        });
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
        if(this.deleteItemSub) { this.deleteItemSub.unsubscribe() }
    }
}