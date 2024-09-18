import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    SideBar,
    SETTING_SIDEBAR
} from '../../_shared';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import { Router } from '@angular/router';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

    public isCollapsed = false;
    public title: any = 'ETL Source 2023';
    public sidebars: SideBar[] = SETTING_SIDEBAR;

    constructor(
        public router: Router,
        public location: Location,
        public alertService: AlertService,
        public commomService: CommomService,
        public spinnerService: SpinnerService) {
    }

    ngOnInit(): void {
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

    public back(): any {
        this.location.back();
    }

}
