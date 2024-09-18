import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    INotification,
    NOTIFICATION_TYPE,
    NotificationService,
    WebSocketAPI,
    WebSocketShareService
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'action-header-list',
    templateUrl: './action-header-list.component.html',
    styleUrls: ['./action-header-list.component.css']
})
export class ActionHeaderListComponent implements OnInit {

    public sessionUser: AuthResponse;
    // notification
    public notificationTotla: number = 0;
    public jobNotificationData: INotification[] = [];
    public userNotificationData: INotification[] = [];

    constructor(
        private webSocketAPI: WebSocketAPI,
        private alertService: AlertService,
        public commomService: CommomService,
        private notificationService: NotificationService,
        private websocketService: WebSocketShareService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue;
        this.webSocketAPI.connect();
        this.onNewValueReceive();
    }

    ngOnInit(): void {
        if (this.sessionUser?.username) {
            this.fetchAllNotifications(this.sessionUser.username);
        }
    }

    private fetchAllNotifications(username: string): void {
        this.notificationService.fetchAllNotification(username).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.userNotificationData = this.processNotifications(response.data, NOTIFICATION_TYPE.USER_NOTIFICATION);
                    this.jobNotificationData = this.processNotifications(response.data, NOTIFICATION_TYPE.JOB_NOTIFICATION);
                }
            ));
    }

    private processNotifications(data: any[], type: NOTIFICATION_TYPE): INotification[] {
        return data.filter(payload => payload?.notifyType.lookupCode === type)
            .map(payload => this.createNotificationData(payload)).reverse();
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
            uuid: payload.uuid,
            title: payload.body.title,
            data: {
                date: payload.dateCreated || payload.createDate,
                message: payload.body.message,
            },
            status: payload.messageStatus.lookupCode === 0 ? 'success' : 'yellow',
            notifyType: payload.notifyType
        };
    }

    public getTotalNotifacation() {
        return 0 +
            (this.jobNotificationData.filter(item => item.status === 'success').length +
            this.userNotificationData.filter(item => item.status === 'success').length);
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

    ngOnDestroy(): void {
        this.webSocketAPI.disconnect();
    }

}
