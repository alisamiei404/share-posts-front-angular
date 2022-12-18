import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service ';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {
  addForm!: FormGroup;
  errors: any = null;
  btnLoading: boolean = false;
  addSub!: Subscription;

  constructor(private postService: PostsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'content': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
    
  }


  onSubmit(){
    if(!this.addForm.valid){
      return;
    }

    this.btnLoading = true;
    
    this.addSub = this.postService.addPost(this.addForm.value).subscribe( res =>{
        this.btnLoading = false;
        this.addForm.reset();
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
    if(this.addSub){
        this.addSub.unsubscribe();
    }
  }

}
