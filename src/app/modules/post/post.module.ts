import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component'; 
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    ShowPostComponent,
    MyPostsComponent
  ],
  imports: [
    PostRoutingModule, 
    SharedModule
  ]
})
export class PostModule { }
