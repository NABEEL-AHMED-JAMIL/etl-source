import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    public breadcrumbs: { label: string, url: string }[] = [];

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit(): void {
        this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    }

}
