import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { 
    AuthenticationService, AuthResponse,
    WebSocketShareService, WebSocketAPI,
    NotificationService, ApiCode, NOTIFICATION_TYPE, INotification
} from '../../_shared';
import { AlertService, SpinnerService, CommomService } from 'src/app/_helpers';

@Component({
    selector: 'app-header-2',
    templateUrl: './header-2.component.html',
    styleUrls: ['./header-2.component.css']
})
export class Header2Component implements OnInit, OnDestroy {

    public title: string = 'ETL 2023';
    public currentUser: AuthResponse;
    public userPermission: any;

    public jobNotificationData: INotification[] = [];
    public userNotificationData: INotification[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private websocketService: WebSocketShareService,
        private webSocketAPI: WebSocketAPI,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService
    ) {
        this.authenticationService.currentUser.subscribe(currentUser => {
            this.currentUser = currentUser;
            if (this.currentUser) {
                this.userPermission = currentUser.profile.permission;
            }
        });

        this.webSocketAPI.connect();
        this.onNewValueReceive();
    }

    ngOnInit(): void {
        if (this.currentUser?.username) {
            this.fetchAllNotifications(this.currentUser.username);
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
                    this.userNotificationData = this.processNotifications(response.data, NOTIFICATION_TYPE.USER_NOTIFICATION, '../../../assets/notifaction/mail.png');
                    this.jobNotificationData = this.processNotifications(response.data, NOTIFICATION_TYPE.JOB_NOTIFICATION, '../../../assets/notifaction/job.png');
                },
                (error: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(error.message, ApiCode.ERROR);
                }
            );
    }

    private processNotifications(data: any[], type: NOTIFICATION_TYPE, avatarPath: string): INotification[] {
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
        this.websocketService.getNewValue().subscribe(response => {
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
                ? './assets/notification/mail.png' 
                : './assets/notification/job.png',
            status: payload.messageStatus.lookupCode === 0 ? 'success' : 'yellow',
            notifyType: payload.notifyType
        };
    }

    public hasPermissionAccess(userProfile: any): boolean {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

    ngOnDestroy(): void {
        this.webSocketAPI.disconnect();
    }
}
