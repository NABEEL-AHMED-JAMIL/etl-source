import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { WebSocketShareService } from './websocketshare.service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {

    public stompClient: any;

    constructor(private websocketShare: WebSocketShareService,
        private authenticationService: AuthenticationService) {
    }

    public connect(): any {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                if (currentUser) {
                    let ws = new SockJS(`${config.webSocketEndPoint}`);
                    this.stompClient = Stomp.over(ws);
                    const _this = this;
                    _this.stompClient.connect({}, function () {
                        _this.stompClient.subscribe("/user/" + currentUser.username + "/reply",
                            function (sdkEvent: any) {
                                _this.onMessageReceived(sdkEvent);
                            });
                        _this.stompClient.reconnect_delay = 2000;
                    });
                }
            });
    };

    public disconnect(): any {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    public onMessageReceived(message: any): void {
        this.websocketShare.onNewValueReceive(message.body);
    }
}