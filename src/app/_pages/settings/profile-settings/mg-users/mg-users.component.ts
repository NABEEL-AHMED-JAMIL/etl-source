import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RegisterComponent } from '../../../index';
import { ApiCode, AppUserService, IAppUser, IStaticTable,
  AuthResponse, AuthenticationService, ROLE, ActionType
} from '../../../../_shared';
import { AlertService, SpinnerService,
  CommomService
} from '../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-mg-users',
  templateUrl: './mg-users.component.html',
  styleUrls: ['./mg-users.component.css']
})
export class MGUsersComponent implements OnInit {

  public loading: any = false;
  public userRole: any;
  public currentUser: AuthResponse;
  public appUser: IAppUser;

  public adminAppUserTable: IStaticTable = {
    tableId: 'admin_app_user_id',
    title: 'App Main User',
    bordered: false,
    checkbox: false,
    size: 'small',
    headerButton: [
      {
        type:'plus-circle',
        color: 'balck',
        spin: false,
        action: ActionType.ADD
      },
      {
        type:'reload',
        color: 'balck',
        spin: false,
        action: ActionType.RE_FRESH
      }
    ],
    dataColumn: [
      {
        field: 'id',
        header: 'User Id',
        type: 'data'
      },
      {
        field: 'fullName',
        header: 'FullName',
        type: 'data'
      },
      {
        field: 'username',
        header: 'Username',
        type: 'data'
      },
      {
        field: 'email',
        header: 'Email',
        type: 'data'
      },
      {
        field: 'profile',
        header: 'Profile',
        type: 'img'
      },
      {
        field: 'roleResponse',
        subfield: 'roleName',
        header: 'Role',
        type: 'arr'
      },
      {
        field: 'status',
        header: 'Status',
        type: 'tag'
      },
      {
        field: 'dateCreated',
        header: 'Created',
        type: 'date'
      }
    ],
    actionType:[
      {
        type:'edit',
        color: 'green',
        spin: false,
        action: ActionType.EDIT
      },
      {
        type:'delete',
        color: 'red',
        spin: false,
        action: ActionType.DELETE
      }
    ]
  };

  public simpleAppUserTable: IStaticTable = {
    tableId: 'simple_app_user_id',
    title: 'App Sub User',
    bordered: false,
    checkbox: false,
    size: 'small',
    headerButton: [
      {
        type:'plus-circle',
        color: 'balck',
        spin: false,
        action: ActionType.ADD
      },
      {
        type:'reload',
        color: 'balck',
        spin: false,
        action: ActionType.RE_FRESH
      }
    ],
    dataColumn: [
      {
        field: 'id',
        header: 'User Id',
        type: 'data'
      },
      {
        field: 'fullName',
        header: 'FullName',
        type: 'data'
      },
      {
        field: 'username',
        header: 'Username',
        type: 'data'
      },
      {
        field: 'email',
        header: 'Email',
        type: 'data'
      },
      {
        field: 'profile',
        header: 'Profile',
        type: 'img'
      },
      {
        field: 'roleResponse',
        subfield: 'roleName',
        header: 'Role',
        type: 'arr'
      },
      {
        field: 'status',
        header: 'Status',
        type: 'tag'
      },
      {
        field: 'dateCreated',
        header: 'Created',
        type: 'date'
      }
    ],
    actionType:[
      {
        type:'edit',
        color: 'green',
        spin: false,
        action: ActionType.EDIT
      },
      {
        type:'delete',
        color: 'red',
        spin: false,
        action: ActionType.DELETE
      }
    ]
  };

  constructor(
    private appUserService: AppUserService,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    public commomService: CommomService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private authenticationService: AuthenticationService) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.userRole = this.currentUser.roles;
      this.getSubAppUserAccount(this.currentUser.username);
  }

  ngOnInit(): void {
  }

  public getSubAppUserAccount(payload: any): void {
		this.spinnerService.show();
		this.appUserService.getSubAppUserAccount(payload)
    .pipe(first())
		.subscribe((response: any) => {
      this.spinnerService.hide();
			if(response.status === ApiCode.ERROR) {
				this.alertService.showError(response?.message, ApiCode.ERROR);
        return;
			}
      this.appUser = response.data;
      this.adminAppUserTable.dataSource = this.filterUserByRole(
        this.appUser.subAppUser, ROLE.ROLE_ADMIN);
      this.simpleAppUserTable.dataSource = this.filterUserByRole(
        this.appUser.subAppUser, ROLE.ROLE_USER);
		}, (error: any) => {
			this.spinnerService.hide();
			this.alertService.showError(error, ApiCode.ERROR);
		});
  }

  private filterUserByRole(subAppUserData: IAppUser[], roleType: ROLE): any {
    return subAppUserData.filter((data: any) => {
      if (data.roleResponse.filter((roledata: any) => {
        return roledata.roleName === ROLE[roleType]}).length > 0) {
        return data;
      }
    }).map((data: any) => { 
      data.id = data.appUserId;
      data.fullName = data.firstName + ' ' + data.lastName;
      return data;
    });
  }

  public buttonActionReciverAdmin(payload: any) {
    if (ActionType.ADD === payload.action) {
      this.openCuLookup(ActionType.ADD, null, ROLE.ROLE_ADMIN);
    } else if (ActionType.RE_FRESH === payload.action) {
      this.getSubAppUserAccount(this.appUser.username);
    }    
  }

  public buttonActionReciverUser(payload: any) {
    if (ActionType.ADD === payload.action) {
      this.openCuLookup(ActionType.ADD, null, ROLE.ROLE_USER);
    } else if (ActionType.RE_FRESH === payload.action) {
      this.getSubAppUserAccount(this.appUser.username);
    }
  }

  public tableActionReciverAdmin(payload: any) {
    if (ActionType.EDIT === payload.action) {
      this.openCuLookup(ActionType.EDIT, payload, ROLE.ROLE_ADMIN);
    } else if (ActionType.DELETE === payload.action) {
      this.deleteAppUserAccount(payload);
    }
  }

  public tableActionReciverUser(payload: any) {
    if (ActionType.EDIT === payload.action) {
      this.openCuLookup(ActionType.EDIT, payload, ROLE.ROLE_USER);
    } else if (ActionType.DELETE === payload.action) {
      this.deleteAppUserAccount(payload);
    }
  }

  private deleteAppUserAccount(payload: any) {
      // delete only in parent side setting so no need to check
      this.modalService.confirm({
        nzTitle: 'Do you want to delete user?',
        nzContent: 'Email : '+payload.data.email + "<br>Press 'Ok' account block & all running job stop.",
        nzOnOk: () => {
          this.closeAppUserAccount({ username: payload.data.username });
        }
      });
  }

  /**
   * Role type-> admin
   * Role type-> user
   */
  private openCuLookup(actionType: ActionType, editPayload: any, roleType: ROLE): void {
    this.drawerService.create({
      nzTitle: actionType === ActionType.ADD ? 'Register User': 'Edit Register (' + editPayload.data.appUserId + ')',
      nzSize: 'large',
      nzExtra: 'Assign Role : '+ROLE[roleType],
      nzMaskClosable: false,
      nzFooter: '<b>Note :- Click The Submit Button To Register The Appuser.</b>',
      nzContent: RegisterComponent,
      nzContentParams: {
        actionType: actionType,
        editPayload: editPayload?.data,
        roleType: [roleType]
      }
    });
  }

  private closeAppUserAccount(payload: any): void {
    this.spinnerService.show();
    this.appUserService.closeAppUserAccount(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.getSubAppUserAccount(this.appUser.username);
        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

  public hasAccess(roleList: any): any {
    return this.userRole.some((role: any) => roleList.includes(role));
  }

}
