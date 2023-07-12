import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AuthResponse, 
  INotifaction, INOTIFACTION_JOB, INOTIFACTION_EMAIL, 
  WebSocketShareService, WebSocketAPI
} from '../../_shared';


@Component({
  selector: 'app-header-2',
  templateUrl: './header-2.component.html',
  styleUrls: ['./header-2.component.css']
})
export class Header2Component implements OnInit {

  public title: any = 'ETL Source 2023';
  public currentUser: AuthResponse;
  public userRole: any;

  public jobNotifactionData: INotifaction[] = [];
  public otherNotifactionData: INotifaction[] = [];

  constructor(private authenticationService: AuthenticationService,
    private websocketService: WebSocketShareService,
    private webSocketAPI: WebSocketAPI) {
    this.authenticationService.currentUser
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        if (this.currentUser) {
          this.userRole = currentUser.roles;
        }
      });
    this.webSocketAPI.connect();
    this.onNewValueReceive();
  }

  ngOnInit(): void {
  }

  // method to receive the updated data.
  public onNewValueReceive() {
    this.websocketService.getNewValue()
    .subscribe(resp => {
      if (resp) {
        let pyalod = JSON.parse(resp);
        console.log(pyalod)
        this.jobNotifactionData.push(pyalod);
      }
    });
  }

  public hasAccess(roleList: any): any {
    return this.userRole.some((role: any) => roleList.includes(role));
  }

  ngOnDestroy() {
    this.webSocketAPI.disconnect(); 
  }

}
