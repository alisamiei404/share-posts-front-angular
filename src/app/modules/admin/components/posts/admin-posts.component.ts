import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminPostService } from "../../services/admin-post.service";

@Component({
    selector: 'app-admin-posts',
    templateUrl: './admin-posts.component.html',
    styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit, OnDestroy  {

    loading: boolean = false;
    posts: any;
    userId: number = 0;
    countPage: number = 0;
    countItem: number = 0;
    activePage: number = 0;
    pageId!: number;
    status!: number;
    fakeArray: any;
    disable: boolean = false;
    postId: number = 0;
    paramsSub!: Subscription;
    itemSub!: Subscription;
    statusItemSub!: Subscription;
    deleteItemSub!: Subscription;
    
    constructor(private adminPostService: AdminPostService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.status = 3;
        this.countItem = this.adminPostService.countItem;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;
            this.postId = 0;
            
            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            this.status = isNaN(+p['pageId']) || +p['status'] < 0 ? 3 : +p['status'];
            
            this.itemSub = this.adminPostService.getPosts(this.pageId, this.status).subscribe((res:any) => {
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

    onChangeCountItem(event: any) {
        let r = event.value;
        r = isNaN(r) || r < 1 || r > 25  ? 5 : r;
        this.countItem = r;
        this.adminPostService.countItem = r;
        this.loading = true;
        this.itemSub = this.adminPostService.getPosts(1, this.status).subscribe((res:any) => {
            this.pageId = 1;
            this.loading = false;
            this.countPage = res.countPage;
            this.fakeArray = new Array(this.countPage);
            this.posts = res.posts;
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
        this.itemSub.unsubscribe();
        this.paramsSub.unsubscribe();
        if(this.statusItemSub) { this.statusItemSub.unsubscribe(); }
        if(this.deleteItemSub) { this.deleteItemSub.unsubscribe(); }
    }
}