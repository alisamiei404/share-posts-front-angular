import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service ';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  getData: boolean = false;
  errors: any = null;
  editForm!: FormGroup;
  slug!: string;
  post!: any;
  btnLoading: boolean = false;
  editSub!: Subscription;
  updateSub!: Subscription;


  constructor(private postService: PostsService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.editSub = this.postService.editPost(this.slug).subscribe((res) => {
      this.post = res;
      this.getData = true;
      this.editForm = new FormGroup({
        'title': new FormControl(this.post.title, [Validators.required, Validators.minLength(1)]),
        'content': new FormControl(this.post.content, [Validators.required, Validators.minLength(2)])
      });
    });

    
    
  }

  onSubmit(){
    if(!this.editForm.valid){
      return;
    }
    
    this.btnLoading = true;
    this.updateSub = this.postService.updatePost(this.slug, this.editForm.value).subscribe( res =>{
        this.btnLoading = false;
        this.editForm.reset();
        this.router.navigate(['/myposts']);
        this.errors = null;
    }, error => {
        this.btnLoading = false;
        if(error.status === 422){
            this.errors = error.error.errors;
        }
    });
  }

  ngOnDestroy(): void {
    if(this.editSub) { this.editSub.unsubscribe(); }
    if(this.updateSub) { this.updateSub.unsubscribe(); }
  }

}
