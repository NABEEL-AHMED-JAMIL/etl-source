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

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
    }

    public changeUserNotifactionStatus(notifaction: INotification, index: any) {
        this.notificationService.updateNotification({id: notifaction.id})
            .pipe(first())
            .subscribe((data: any) => {
                if (data.status === ApiCode.ERROR) {
                    return;
                }
                this.userNotificationData[index].status = "yellow";
            });
    }

    public changeJobNotifactionStatus(notifaction: INotification, index: any) {
        this.notificationService.updateNotification({id: notifaction.id})
            .pipe(first())
            .subscribe((data: any) => {
                if (data.status === ApiCode.ERROR) {
                    return;
                }
                this.jobNotificationData[index].status = "yellow";
            });
    }

}
