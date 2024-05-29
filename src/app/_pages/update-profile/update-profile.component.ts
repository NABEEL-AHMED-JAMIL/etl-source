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
    SpinnerService,
    CommomService,
    StorageService
} from 'src/app/_helpers';
import { first } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { EnvVariableValueComponent } from '..';


@Component({
    selector: 'update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {

    public resetPasswordForm: FormGroup;
    public currentUser: AuthResponse;
    public appUser: IAppUser;

    public fileList: NzUploadFile[] = [];

    // e-varaible
    public eVariableTable: IStaticTable = {
        tableId: 'variable_id',
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
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            }
        ]
    };

    // geneate token
    public eventBridgeTable: IStaticTable = {
        tableId: 'eventBridge_id',
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
                type: 'tag'
            },
            {
                field: 'description',
                header: 'Description',
                type: 'data'
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

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService,
        public storageService: StorageService,
        private appUserService: AppUserService,
        private evenBridgeService: EvenBridgeService,
        private modalService: NzModalService,
        private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.fetchAppUserProfile(this.currentUser.username);
    }

    ngOnInit() {
    }

    public refresh() {
        this.fetchAppUserProfile(this.currentUser.username);
    }

    public fetchAppUserProfile(payload: any): void {
        this.spinnerService.show();
        this.appUserService.fetchAppUserProfile(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response?.message, ApiCode.ERROR);
                    return;
                }
                this.appUser = response.data;
                this.eVariableTable.dataSource = this.appUser.enVariables;
                this.eventBridgeTable.dataSource = this.appUser.eventBridge;
                this.fillAppUserPasswordDetail(this.appUser);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public fillAppUserPasswordDetail(payload: IAppUser): void {
        this.resetPasswordForm = this.fb.group({
            id: [payload.id],
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

    public submitResetPassword(): any {
        this.spinnerService.show();
        if (this.resetPasswordForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        this.spinnerService.show();
        this.appUserService.updateAppUserPassword(this.resetPasswordForm.getRawValue())
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.authenticationService.logout()
                    .pipe(first())
                    .subscribe((data: any) => {
                        this.spinnerService.hide();
                        if (data.status === ApiCode.ERROR) {
                            this.alertService.showError(data.message, ApiCode.ERROR);
                            return;
                        }
                        this.storageService.clear();
                        this.router.navigate(['/login']);
                    }, (error: any) => {
                        this.spinnerService.hide();
                        this.alertService.showError(error.message, ApiCode.ERROR);
                    });
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
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
            drawerRef.afterClose.subscribe(data => {
                this.fetchAppUserProfile(this.currentUser.username);
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
        this.spinnerService.show();
        this.evenBridgeService.genEventBridgeToken({
            tokenId: payload.data.tokenId
        })
        .pipe(first())
        .subscribe((response: any) => {
            this.spinnerService.hide();
            if (response.status === ApiCode.ERROR) {
                this.alertService.showError(response.message, ApiCode.ERROR);
                return;
            }
            payload.data.tokenId = response.data.tokenId;
            payload.data.expireTime = response.data.expireTime;
            payload.data.accessToken = response.data.accessToken;
        }, (response: any) => {
            this.spinnerService.hide();
            this.alertService.showError(response.error.message, ApiCode.ERROR);;
        });
    }

}