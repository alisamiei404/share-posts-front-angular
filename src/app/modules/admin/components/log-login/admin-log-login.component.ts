import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminDashboardService } from "../../services/admin-dashboard.service";

@Component({
    selector: 'app-admin-log-login',
    templateUrl: './admin-log-login.component.html'
})
export class AdminLogLoginComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    items: any;
    isLogin: boolean = false;
    countPage: number = 0;
    activePage: number = 0;
    pageId!: number;
    fakeArray: any;
    paramsSub!: Subscription;
    itemSub!: Subscription;


    constructor(private adminDashboardService: AdminDashboardService , private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageId = 1;
        this.loading = true;

        this.paramsSub = this.route.queryParams.subscribe((p)=>{
            this.loading = true;

            this.pageId = isNaN(+p['pageId']) || +p['pageId'] < 1  ? 1 : +p['pageId'];
            
            this.itemSub = this.adminDashboardService.getLogLogin(this.pageId).subscribe((res:any) => {
                this.loading = false;
                this.countPage = res.countPage;
                if(this.pageId > this.countPage && this.countPage !== 0){
                this.router.navigate(['/not-found']);
                }
                this.fakeArray = new Array(this.countPage);
                this.items = res.items;
            });
        });
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
    }
}