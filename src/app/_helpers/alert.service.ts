import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
    ApiCode,
} from '../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private readonly notification: NzNotificationService) { }

    public showSuccess(title: ApiCode, message: any): void {
        this.notification.create('success', title, message);
    }

    public showError(title: ApiCode, message: any): void {
        this.notification.create('error', title, message);
    }

    public showInfo(title: ApiCode, message: any): void {
        this.notification.create('info', title, message);
    }

    public showWarning(title: ApiCode, message: any): void {
        this.notification.create('warning', title, message);
    }
}