import { Component, OnInit } from '@angular/core';
import {
    AuthenticationService, AuthResponse,
    INotifaction,
    WebSocketShareService,
    WebSocketAPI
} from '../../_shared';
import { NzSelectSizeType } from 'ng-zorro-antd/select';


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
    public otherNotifactionData: INotifaction[] = [];

    constructor(private authenticationService: AuthenticationService,
        private websocketService: WebSocketShareService,
        private webSocketAPI: WebSocketAPI) {
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
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
    }

    // method to receive the updated data.
    public onNewValueReceive() {
        this.websocketService.getNewValue()
            .subscribe(resp => {
                if (resp) {
                    let pyalod = JSON.parse(resp);
                    this.jobNotifactionData.push(pyalod);
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
