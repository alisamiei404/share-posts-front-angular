import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminPostService } from '../../services/admin-post.service';

@Component({
  selector: 'app-admin-show-post',
  templateUrl: './admin-show-post.component.html',
  styleUrls: ['./admin-show-post.component.css']
})
export class AdminShowPostComponent implements OnInit, OnDestroy {
    dataSet: boolean = false;
    slug!: string;
    post!: any;
    itemSub!: Subscription;


    constructor(private route: ActivatedRoute, private adminPostService: AdminPostService, private router: Router) { }

    ngOnInit(): void {
        this.slug = this.route.snapshot.params['slug'];
        this.itemSub = this.adminPostService.getPost(this.slug).subscribe((res) => {
        if(res !== null){
            this.post = res;
            this.dataSet = true;
        }else{
            this.dataSet = false;
            this.router.navigate(['/not-found']);
        }
        });
    }

    ngOnDestroy(): void {
        this.itemSub.unsubscribe();
    }

}
