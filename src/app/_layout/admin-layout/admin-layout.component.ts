import { Component, OnInit } from '@angular/core';
import {
    SideBar,
    SETTING_SIDEBAR
} from '../../_shared';
import { RootLayout } from '../root-layout';


@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent extends RootLayout implements OnInit {

    public isCollapsed = false;
    public displayMainContent = false;
    public title: any = 'ETL Source 2023';
    public sidebars: SideBar[] = SETTING_SIDEBAR;

    ngOnInit(): void {

    }


}
