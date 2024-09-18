import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
    ActionType,
    ApiCode,
    AppUserService,
    AuthResponse,
    AuthenticationService,
    IAppUser,
    IStaticTable,
    EvenBridgeService
} from '../../_shared';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    CommomService,
    StorageService
} from 'src/app/_helpers';
import { first } from 'rxjs';
import { EnvVariableValueComponent } from '..';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {

    public resetPasswordForm: FormGroup;
    public sessionUser: AuthResponse;
    public appUser: IAppUser;

    public eVariableTable = this.initEVariableTable();
    public eventBridgeTable = this.initEventBridgeTable();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private alertService: AlertService,
        public commomService: CommomService,
        public storageService: StorageService,
        private appUserService: AppUserService,
        private evenBridgeService: EvenBridgeService,
        private modalService: NzModalService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
        this.fetchAppUserProfile(this.sessionUser.username);
    }

    ngOnInit() {}

    private initEVariableTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(), // uuid for table
            title: 'E-Variable',
            bordered: true,
            checkbox: false,
            size: 'small',
            dataColumn: [
                {
                    field: 'envKey',
                    header: 'Key',
                    type: 'data'
                },
                {
                    field: 'envValue',
                    header: 'Value',
                    type: 'data'
                },
                {
                    field: 'description',
                    header: 'Description',
                    type: 'data'
                }
            ],
            actionType: [
                {
                    type: 'form',
                    color: 'green',
                    spin: false,
                    tooltipTitle: 'Edit',
                    action: ActionType.EDIT
                }
            ]
        };
    }

    private initEventBridgeTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(), // uuid for table
            title: 'Event Bridge',
            bordered: true,
            checkbox: false,
            size: 'small',
            dataColumn: [
                {
                    field: 'name',
                    header: 'Name',
                    type: 'data'
                },
                {
                    field: 'bridgeUrl',
                    header: 'Url',
                    type: 'data'
                },
                {
                    field: 'bridgeType',
                    header: 'Type',
                    type: 'tag',
                    showImg: true
                },
                {
                    field: 'httpMethod',
                    header: 'Method',
                    type: 'tag'
                },
                {
                    
                    field: 'tokenId',
                    header: 'Token Id',
                    type: 'data'
                },
                {
                    field: 'expireTime',
                    header: 'Expire Time',
                    type: 'date'
                }
            ],
            actionType: [
                {
                    type: 'download',
                    color: '#11315f',
                    spin: false,
                    tooltipTitle: 'Download',
                    action: ActionType.DOWNLOAD
                },
                {
                    type: 'sync',
                    color: 'orange',
                    spin: false,
                    tooltipTitle: 'Gernate Token',
                    action: ActionType.GEN_TOKEN
                }
            ]
        };    
    }

    public refresh() {
        this.fetchAppUserProfile(this.sessionUser.username);
    }

    public fillAppUserPasswordDetail(payload: IAppUser): void {
        this.resetPasswordForm = this.fb.group({
            uuid: [payload.uuid],
            email: [payload.email, [Validators.email, Validators.required]],
            username: [payload.username, [Validators.required]],
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
        });
        this.resetPasswordForm.controls['email'].disable();
        this.resetPasswordForm.controls['username'].disable();
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.resetPasswordForm.controls['confirm'].updateValueAndValidity());
    }

    public confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.resetPasswordForm.controls['newPassword'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    public fetchAppUserProfile(payload: any): void {
        this.appUserService.fetchAppUserProfile(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.appUser = response.data;
                    this.eVariableTable.dataSource = this.appUser.enVariables;
                    this.eventBridgeTable.dataSource = this.appUser.eventBridge;
                    this.fillAppUserPasswordDetail(this.appUser);
                })
            );
    }

    public submitResetPassword(): any {
        if (this.resetPasswordForm.invalid) {
            return;
        }
        this.appUserService.updateAppUserPassword(this.resetPasswordForm.getRawValue()).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.authenticationService.logout().pipe(first())
                        .subscribe((response: any) => 
                            this.handleApiResponse(response, () => {
                                this.storageService.clear();
                                this.router.navigate(['/login']);
                            })
                        )
                })
            );
    }

    public tableEVariableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            const drawerRef = this.modalService.create({
                nzTitle: 'Environment Variable',
                nzMaskClosable: false,
                nzContent: EnvVariableValueComponent,
                nzComponentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                },
                nzFooter: null // Set the footer to null to hide it
            });
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAppUserProfile(this.sessionUser.username);
            });
        }
    }

    public tableEventBridgeActionReciver(payload: any): void {
        if (ActionType.GEN_TOKEN === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to genrate the token?',
                nzContent: 'Press \'Ok\' will generate the new token.',
                nzOnOk: () => {
                    this.genEventBridgeToken(payload);
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to genrate the token file?',
                nzContent: 'Press \'Ok\' will generate the file.',
                nzOnOk: () => {
                    this.commomService.createFile(payload.data);
                }
            });
        }
    }

    public genEventBridgeToken(payload: any): void {
        this.evenBridgeService.genEventBridgeToken({
            tokenId: payload.data.tokenId
        }).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    payload.data.tokenId = response.data.tokenId;
                    payload.data.expireTime = response.data.expireTime;
                    payload.data.accessToken = response.data.accessToken;
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
        );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}