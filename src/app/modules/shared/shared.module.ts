import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerComponent } from "./component/loading-spinner/loading-spinnercomponent";
import { PaginationComponent } from "./component/pagination/pagination.component";
import { RouterModule } from "@angular/router";
import { JalaliPipe } from "src/app/pipe/jalali.pipe";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        PaginationComponent,
        JalaliPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        RouterModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingSpinnerComponent,
        PaginationComponent,
        JalaliPipe
    ]
})
export class SharedModule {}