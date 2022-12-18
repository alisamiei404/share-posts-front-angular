import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminHeaderComponent } from './components/header/admin-header.component';
import { AdminFooterComponent } from './components/footer/admin-footer.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/users/admin-users.component';
import { AdminPostsComponent } from './components/posts/admin-posts.component';
import { AdminUserPostsComponent } from './components/user-posts/admin-user-posts.component';
import { AdminShowPostComponent } from './components/show-post/admin-show-post.component';
import { AdminLogLoginComponent } from './components/log-login/admin-log-login.component';
import { AdminLogRequestComponent } from './components/log-request/admin-log-request.component'; 
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminPostsComponent,
    AdminUserPostsComponent,
    AdminShowPostComponent,
    AdminLogLoginComponent,
    AdminLogRequestComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
