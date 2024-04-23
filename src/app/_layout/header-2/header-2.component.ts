import { Component, OnInit } from '@angular/core';
import {
    AuthenticationService, AuthResponse,
    INotifaction,
    WebSocketShareService,
    WebSocketAPI,
    NotificationService,
    ApiCode,
    NOTIFICATION_TYPE
} from '../../_shared';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';


@Component({
    selector: 'app-header-2',
    templateUrl: './header-2.component.html',
    styleUrls: ['./header-2.component.css']
})
export class Header2Component implements OnInit {

    public title: any = 'ETL 2023';
    public currentUser: AuthResponse;
    public userPermission: any;

    public jobNotifactionData: INotifaction[] = [];
    public userNotifactionData: INotifaction[] = [];

    constructor(private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private websocketService: WebSocketShareService,
        private webSocketAPI: WebSocketAPI,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.currentUser = currentUser;
                if (this.currentUser) {
                    this.userPermission = currentUser.profile.permission;
                }
            });
        this.webSocketAPI.connect();
        this.onNewValueReceive();
    }

    ngOnInit(): void {
        this.fetchAllNotification(this.currentUser.username);
    }

    public fetchAllNotification(username: any): any {
        this.spinnerService.show();
        this.notificationService.fetchAllNotification(username)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                // other notification
                this.userNotifactionData = response.data
                    .filter((payload: any) => {
                        return payload.notifyType.lookupCode === NOTIFICATION_TYPE.USER_NOTIFICATION
                    }).map((pyalod: any) => {
                        return {
                            id: pyalod.id,
                            title: pyalod.body.title,
                            data: {
                                date: pyalod.dateCreated,
                                message: pyalod.body.message,
                            },
                            avatar: './assets/notifaction/mail.png',
                            status: pyalod.messageStatus.lookupCode == 0 ? 'success' : 'yellow',
                            notifyType: pyalod.notifyType
                        };
                    });
                this.userNotifactionData.reverse();
                // job notifaction
                this.jobNotifactionData = response.data
                    .filter((payload: any) => {
                        return payload.notifyType.lookupCode === NOTIFICATION_TYPE.JOB_NOTIFICATION
                    }).map((pyalod: any) => {
                        return {
                            id: pyalod.notifyId,
                            title: pyalod.body.title,
                            data: {
                                date: pyalod.createDate,
                                message: pyalod.body.message,
                            },
                            avatar: './assets/notifaction/job.png',
                            status: pyalod.messageStatus.lookupCode == 0 ? 'success' : 'yellow',
                            notifyType: pyalod.notifyType
                        };
                    });
                this.jobNotifactionData.reverse();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    // method to receive the updated data.
    public onNewValueReceive() {
        this.websocketService.getNewValue()
            .subscribe(response => {
                if (response) {
                    let pyalod = JSON.parse(response);
                    if (pyalod.notifyType.lookupCode === NOTIFICATION_TYPE.USER_NOTIFICATION) {
                        this.userNotifactionData.push({
                            id: pyalod.id,
                            title: pyalod.body.title,
                            data: {
                                date: pyalod.dateCreated,
                                message: pyalod.body.message,
                            },
                            avatar: './assets/notifaction/mail.png',
                            status: pyalod.messageStatus.lookupCode == 0 ? 'success' : 'yellow',
                            notifyType: pyalod.notifyType
                        });
                        this.userNotifactionData.reverse();
                    } else {
                        this.jobNotifactionData.push({
                            id: pyalod.notifyId,
                            title: pyalod.body.title,
                            data: {
                                date: pyalod.createDate,
                                message: pyalod.body.message,
                            },
                            avatar: './assets/notifaction/job.png',
                            status: pyalod.messageStatus.lookupCode == 0 ? 'success' : 'yellow',
                            notifyType: pyalod.notifyType
                        });
                        this.jobNotifactionData.reverse();
                    }
                }
            });
    }

    public hasPermissionAccess(userProfile: any): any {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

    ngOnDestroy() {
        this.webSocketAPI.disconnect();
    }

}
