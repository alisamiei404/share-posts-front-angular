import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { AdminLogLoginComponent } from './components/log-login/admin-log-login.component';
import { AdminLogRequestComponent } from './components/log-request/admin-log-request.component';
import { AdminPostsComponent } from './components/posts/admin-posts.component';
import { AdminShowPostComponent } from './components/show-post/admin-show-post.component';
import { AdminUserPostsComponent } from './components/user-posts/admin-user-posts.component';
import { AdminUsersComponent } from './components/users/admin-users.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivate: [AuthGuard, AdminGuard], children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'logins', component: AdminLogLoginComponent },
    { path: 'requests', component: AdminLogRequestComponent },
    { path: 'posts', component: AdminPostsComponent },
    { path: 'postsUser', component: AdminUserPostsComponent },
    { path: 'showpost/:slug', component: AdminShowPostComponent },
    { path: '', component: AdminDashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
