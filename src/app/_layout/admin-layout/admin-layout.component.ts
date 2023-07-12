import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SideBar, SETTING_SIDEBAR } from '../../_shared';
import { AuthenticationService, AuthResponse } from '../../_shared';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public isCollapsed = false;
  public displayMainContent = false;
  public title: any = 'ETL Source 2023';
  public sidebars: SideBar[] = SETTING_SIDEBAR;

  public currentUser: AuthResponse;
  public userRole: any;

  constructor(private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        if (this.currentUser) {
          this.userRole = currentUser.roles;
        }
      });
  }

  ngOnInit(): void {
  }

  public hasAccess(roleList: any): any {
    return this.userRole.some((role: any) => roleList.includes(role));
  }

  public back(): any {
    this.location.back();
  }

  public home(): any {
    this.router.navigate(['/dashboard']);
  }
  

}
