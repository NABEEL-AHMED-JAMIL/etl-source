import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import {
    AuthenticationService,
    WebSocketShareService
} from '../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {

    public stompClient: any;

    constructor(private readonly websocketShare: WebSocketShareService,
        private readonly authenticationService: AuthenticationService) {
    }

    public connect(): any {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                if (currentUser) {
                    let ws = new SockJS(`${config.webSocketEndPoint}`);
                    this.stompClient = Stomp.over(ws);
                    this.stompClient.connect({}, function () {
                        this.stompClient.subscribe("/user/" + currentUser.username + "/reply",
                            function (sdkEvent: any) {
                                this.onMessageReceived(sdkEvent);
                            });
                        this.stompClient.reconnect_delay = 2000;
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