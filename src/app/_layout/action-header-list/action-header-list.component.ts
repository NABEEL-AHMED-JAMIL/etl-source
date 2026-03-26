import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from '../../_helpers';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    INotification,
    NOTIFICATION_TYPE,
    NotificationService,
    WebSocketAPI,
    WebSocketShareService
} from '../../_shared';


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
    public notificationTotal = 0;
    public jobNotificationData: INotification[] = [];
    public userNotificationData: INotification[] = [];

    private newValueSubscription: any;

    constructor(
        public readonly commomService: CommomService,
        private readonly webSocketAPI: WebSocketAPI,
        private readonly alertService: AlertService,
        private readonly notificationService: NotificationService,
        private readonly websocketService: WebSocketShareService,
        private readonly authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue ?? null;
        this.webSocketAPI.connect();
        this.subscribeToNewValues();
    }

    ngOnInit(): void {
        if (this.sessionUser?.username) {
            this.fetchAllNotifications(this.sessionUser.username);
        }
    }

    private fetchAllNotifications(username: string): void {
        this.notificationService.fetchAllNotification(username)
            .pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    const data = response?.data ?? [];
                    this.userNotificationData = this.processNotifications(data, NOTIFICATION_TYPE.USER_NOTIFICATION);
                    this.jobNotificationData = this.processNotifications(data, NOTIFICATION_TYPE.JOB_NOTIFICATION);
                })
            );
    }

    private processNotifications(data: any[] = [], type: NOTIFICATION_TYPE): INotification[] {
        const mapped = data
            .filter(payload => payload?.notifyType?.lookupCode === type)
            .map(payload => this.createNotificationData(payload));

        return mapped.sort((a, b) => {
            const da = new Date(a.data?.date || 0).getTime();
            const db = new Date(b.data?.date || 0).getTime();
            return db - da;
        });
    }

    private subscribeToNewValues(): void {
        this.newValueSubscription = this.websocketService.getNewValue()
        .subscribe(response => {
            if (!response) { return; }
            const payload = JSON.parse(response);
            const notificationData = this.createNotificationData(payload);
            if (payload?.notifyType?.lookupCode === NOTIFICATION_TYPE.USER_NOTIFICATION) {
                this.userNotificationData.unshift(notificationData);
            } else if (payload?.notifyType?.lookupCode === NOTIFICATION_TYPE.JOB_NOTIFICATION) {
                this.jobNotificationData.unshift(notificationData);
            }
        });
    }

    private createNotificationData(payload: any): INotification {
        return {
            uuid: payload?.uuid,
            title: payload?.body?.title,
            data: {
                date: payload?.dateCreated ?? payload?.createDate,
                message: payload?.body?.message
            },
            status: payload?.messageStatus?.lookupCode === 0 ? 'success' : 'yellow',
            notifyType: payload?.notifyType
        };
    }

    public getTotalNotifacation(): number {
        const successCount = (arr: INotification[]) => arr.filter(i => i.status === 'success').length;
        return successCount(this.jobNotificationData) + successCount(this.userNotificationData);
    }

    private handleApiResponse(response: any, successCallback: () => void): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(ApiCode.ERROR, response.message);
            return;
        }
        successCallback();
    }

    ngOnDestroy(): void {
        if (this.newValueSubscription && typeof this.newValueSubscription.unsubscribe === 'function') {
            this.newValueSubscription.unsubscribe();
        }
        this.webSocketAPI.disconnect();
    }

}
