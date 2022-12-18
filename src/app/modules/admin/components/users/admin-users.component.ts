import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service ";
import { PostsService } from "src/app/service/posts.service";
import { AdminUserService } from "../../services/admin-user.service";

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    users: any;
    isLogin: boolean = false;
    countPage: number = 0;
    activePage: number = 0;
    pageId!: number;
    fakeArray: any;
    slugStatusChanged: string = '';
    paramsSub!: Subscription;
    itemSub!: Subscription;
    statusItemSub!: Subscription;
    deleteItemSub!: Subscription;

    constructor(private adminUserService: AdminUserService , private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;
            
            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            
            this.itemSub = this.adminUserService.getUsers(this.pageId).subscribe((res:any) => {
                this.loading = false;
                this.countPage = res.countPage;
                if(this.pageId > this.countPage && this.countPage !== 0){
                this.router.navigate(['/not-found']);
                }
                this.fakeArray = new Array(this.countPage);
                this.users = res.users;
            });
        });
    }

    statusChange(slug: string){
        this.slugStatusChanged = slug;
        this.statusItemSub = this.adminUserService.changeStatuUser(slug).subscribe(res => {
            this.adminUserService.getUsers(this.pageId).subscribe((res:any) => {
                this.slugStatusChanged = '';
                this.users = res.users;
            });
        });
    }

    onDelete(slug: string){
        this.loading = true;
        this.deleteItemSub = this.adminUserService.deleteUser(slug).subscribe(res => {
            this.adminUserService.getUsers(this.pageId).subscribe((res:any) => {
                this.loading = false;
                this.users = res.users;
            });
        });
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
        if (this.statusItemSub) { this.statusItemSub.unsubscribe(); }
        if (this.deleteItemSub) { this.deleteItemSub.unsubscribe(); }
        
    }
}