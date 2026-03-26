import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../_helpers';


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

    constructor(private readonly breadcrumbService: BreadcrumbService) { }

    ngOnInit(): void {
        this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    }

}
