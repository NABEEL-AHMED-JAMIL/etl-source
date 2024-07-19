import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    SideBar,
    SETTING_SIDEBAR,
    ApiCode,
    AuthenticationService,
    AuthResponse,
    INotification,
    NOTIFICATION_TYPE,
    NotificationService,
    WebSocketAPI,
    WebSocketShareService,
} from '../../_shared';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';


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

    public userPermission: any;
    public sessionUser: AuthResponse;
    public jobNotificationData: INotification[] = [];
    public userNotificationData: INotification[] = [];

    constructor(
        public router: Router,
        public location: Location,
        public authenticationService: AuthenticationService,
        public notificationService: NotificationService,
        public websocketService: WebSocketShareService,
        public webSocketAPI: WebSocketAPI,
        public alertService: AlertService,
        public spinnerService: SpinnerService,
        public commomService: CommomService) {
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
        if (this.sessionUser?.username) {
            this.fetchAllNotifications(this.sessionUser.username);
        }
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

    ngOnDestroy(): void {
        this.webSocketAPI.disconnect();
    }

}
