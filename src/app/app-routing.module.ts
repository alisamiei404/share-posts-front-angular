import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "./component/app-layout.component";
import { HomeComponent } from "./component/home/home.component";
import { NotFoundComponent } from "./component/not-found/not-found.component";

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            {
                path: '',
                loadChildren: () => import('./modules/post/post.module').then((m) => m.PostModule)
            },
            { path: 'not-found', component: NotFoundComponent }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule {}