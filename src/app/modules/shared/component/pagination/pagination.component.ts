import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.compoent.html'
})
export class PaginationComponent implements OnInit {
    fakeArray: any;
    @Input() countPage: any;
    @Input() slug: any;
    @Input() pageId: any;
    @Input() status: any;

    ngOnInit() {
        this.countPage = +this.countPage;
        this.pageId = +this.pageId;
        this.status = this.status;
        this.slug = this.slug;
        this.fakeArray = new Array(this.countPage);
    }


}