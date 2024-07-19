import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    DashboardService,
    INotification,
    NOTIFICATION_TYPE,
    NotificationService,
    ReportSettingService,
    WebSocketAPI,
    WebSocketShareService,
} from '../../_shared';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';


@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent implements OnInit {

    public isCollapsed = false;
    public displayMainContent = false;
    public title: any = 'ETL Source R&D 2023';
    public reportList: any[];
    public dashboardList: any[];

    public userPermission: any;
    public sessionUser: AuthResponse;
    public jobNotificationData: INotification[] = [];
    public userNotificationData: INotification[] = [];

    constructor(
        private router: Router,
        private location: Location,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private websocketService: WebSocketShareService,
        private webSocketAPI: WebSocketAPI,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private reportSettingService: ReportSettingService,
        private dashboardService: DashboardService) {
        this.authenticationService.currentUser
        .subscribe(currentUser => {
            this.sessionUser = currentUser;
            if (this.sessionUser) {
                this.userPermission = currentUser.profile.permission;
            }
        });
        this.webSocketAPI.connect();
        this.onNewValueReceive();
    }

    ngOnInit(): void {
        this.fetchAllReportByGroup({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.fetchAllDashboardSettingByGroup({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        if (this.sessionUser?.username) {
            this.fetchAllNotifications(this.sessionUser.username);
        }
    }

    // fetch all lookup
    public fetchAllReportByGroup(payload: any): any {
        this.spinnerService.show();
        this.reportSettingService.fetchAllReportByGroup(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.reportList = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // fetch all lookup
    public fetchAllDashboardSettingByGroup(payload: any): any {
        this.spinnerService.show();
        this.dashboardService.fetchAllDashboardSettingByGroup(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.dashboardList = response.data;
                console.log(this.dashboardList);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    private fetchAllNotifications(username: string): void {
        this.spinnerService.show();
        this.notificationService.fetchAllNotification(username)
            .pipe(first())
            .subscribe(
                (response: any) => {
                    this.spinnerService.hide();
                    if (response.status === ApiCode.ERROR) {
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.userNotificationData = this.processNotifications(response.data,
                        NOTIFICATION_TYPE.USER_NOTIFICATION, '../../../assets/notifaction/mail.png');
                    this.jobNotificationData = this.processNotifications(response.data,
                        NOTIFICATION_TYPE.JOB_NOTIFICATION, '../../../assets/notifaction/job.png');
                },
                (response: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(response.error.message, ApiCode.ERROR);
                }
            );
    }

    private processNotifications(data: any[], 
        type: NOTIFICATION_TYPE, avatarPath: string): INotification[] {
        return data
            .filter(payload => payload?.notifyType.lookupCode === type)
            .map(payload => ({
                id: payload.id || payload.notifyId,
                title: payload.body.title,
                data: {
                    date: payload.dateCreated || payload.createDate,
                    message: payload.body.message,
                },
                avatar: avatarPath,
                status: payload.messageStatus.lookupCode === 0 ? 'success' : 'yellow',
                notifyType: payload.notifyType
            }))
            .reverse();
    }

    private onNewValueReceive(): void {
        this.websocketService.getNewValue()
        .subscribe(response => {
            if (response) {
                const payload = JSON.parse(response);
                const notificationData = this.createNotificationData(payload);

                if (payload.notifyType.lookupCode === NOTIFICATION_TYPE.USER_NOTIFICATION) {
                    this.userNotificationData.push(notificationData);
                    this.userNotificationData.reverse();
                } else if (payload.notifyType.lookupCode === NOTIFICATION_TYPE.JOB_NOTIFICATION) {
                    this.jobNotificationData.push(notificationData);
                    this.jobNotificationData.reverse();
                }
            }
        });
    }

    private createNotificationData(payload: any): INotification {
        return {
            id: payload.id || payload.notifyId,
            title: payload.body.title,
            data: {
                date: payload.dateCreated || payload.createDate,
                message: payload.body.message,
            },
            avatar: payload.notifyType.lookupCode === NOTIFICATION_TYPE.USER_NOTIFICATION 
                ? './assets/notification/mail.png' : './assets/notification/job.png',
            status: payload.messageStatus.lookupCode === 0 ? 'success' : 'yellow',
            notifyType: payload.notifyType
        };
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

    public back(): any {
        this.location.back();
    }

    public hasPermissionAccess(userProfile: any): boolean {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

    public getReportKeys(): any {
        return Object.keys(this.reportList);
    }

    public getReportValue(key: any): any {
        return this.reportList[key];
    }

    public getDashboardKeys(): any {
        return Object.keys(this.dashboardList);
    }

    public getDashboardValue(key: any): any {
        return this.dashboardList[key];
    }

    ngOnDestroy(): void {
        this.webSocketAPI.disconnect();
    }

}