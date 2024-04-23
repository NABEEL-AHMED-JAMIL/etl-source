import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    ApiCode,
    INotifaction,
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
    public jobNotifactionData: INotifaction[];
    @Input()
    public userNotifactionData: INotifaction[];

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    public changeUserNotifactionStatus(notifaction: INotifaction, index: any) {
        this.notificationService.updateNotification({id: notifaction.id})
            .pipe(first())
            .subscribe((data: any) => {
                if (data.status === ApiCode.ERROR) {
                    return;
                }
                this.userNotifactionData[index].status = "yellow";
            });
    }

    public changeJobNotifactionStatus(notifaction: INotifaction, index: any) {
        this.notificationService.updateNotification({id: notifaction.id})
            .pipe(first())
            .subscribe((data: any) => {
                if (data.status === ApiCode.ERROR) {
                    return;
                }
                this.jobNotifactionData[index].status = "yellow";
            });
    }

}
