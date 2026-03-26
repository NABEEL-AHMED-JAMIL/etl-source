import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    ApiCode,
    INotification,
    NotificationService
} from '../../_shared';
import { first } from 'rxjs';
import { AlertService } from 'src/app/_helpers';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-notifaction-action',
    templateUrl: './notifaction-action.component.html',
    styleUrls: ['./notifaction-action.component.css']
})
export class NotifactionActionComponent implements OnInit {

    @Input()
    public jobNotificationData: INotification[] = [];
    @Input()
    public userNotificationData: INotification[] = [];

    constructor(
        private readonly alertService: AlertService,
        private readonly notificationService: NotificationService
    ) {}

    ngOnInit(): void {}

    public changeUserNotifactionStatus(notifaction: INotification, index: number): void {
        this.updateNotificationStatus(this.userNotificationData, notifaction, index);
    }

    public changeJobNotifactionStatus(notifaction: INotification, index: number): void {
        this.updateNotificationStatus(this.jobNotificationData, notifaction, index);
    }

    private updateNotificationStatus(list: INotification[], notifaction: INotification, index: number): void {
        if (!list || index < 0 || index >= list.length) {
            return;
        }
        // optional safety check that the passed notification matches the item at index
        if (list[index].uuid !== notifaction.uuid) {
            return;
        }
        this.notificationService.updateNotification({ uuid: notifaction.uuid })
            .pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    list[index].status = 'yellow';
                })
            );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(ApiCode.ERROR, response.message);
            return;
        }
        successCallback();
    }

}
