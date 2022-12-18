import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PostsService } from "src/app/service/posts.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    posts: any;
    userId: number = 0;
    countPage: number = 0;
    activePage: number = 0;
    pageId!: number;
    fakeArray: any;
    itemSub!: Subscription;
    paramsSub!: Subscription;

    constructor(private postService: PostsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;
            
            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            
            this.itemSub = this.postService.getPosts(this.pageId).subscribe((res:any) => {
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


    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
    }
}