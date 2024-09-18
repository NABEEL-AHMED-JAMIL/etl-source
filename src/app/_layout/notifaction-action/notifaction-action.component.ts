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
    public jobNotificationData: INotification[];
    @Input()
    public userNotificationData: INotification[];

    constructor(private alertService: AlertService,
        private notificationService: NotificationService) {}

    ngOnInit(): void {
    }

    public changeUserNotifactionStatus(notifaction: INotification, index: any) {
        this.notificationService.updateNotification({uuid: notifaction.uuid}).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.userNotificationData[index].status = "yellow";
                }
            ));
    }

    public changeJobNotifactionStatus(notifaction: INotification, index: any) {
        this.notificationService.updateNotification({uuid: notifaction.uuid}).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.jobNotificationData[index].status = "yellow";
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
