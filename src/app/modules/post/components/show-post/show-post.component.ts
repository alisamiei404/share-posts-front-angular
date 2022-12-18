import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  slug!: string;
  post!: any;
  private itemSub!: Subscription;

  constructor(private route: ActivatedRoute, private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.loading = true;
    this.itemSub = this.postService.getPost(this.slug).subscribe((res) => {
        this.loading = false;
        if(res !== null){
            this.post = res;
        }else{
            this.router.navigate(['/not-found']);
        }
    });
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }

}
