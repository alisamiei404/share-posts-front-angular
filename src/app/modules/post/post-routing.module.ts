import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { ShowPostComponent } from './components/show-post/show-post.component';

const routes: Routes = [
  { path: 'addpost', component: AddPostComponent, canActivate: [AuthGuard]  },
  { path: 'myposts', component: MyPostsComponent, canActivate: [AuthGuard] },
  { path: 'showpost/:slug', component: ShowPostComponent },
  { path: 'editpost/:slug/edit', component: EditPostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
