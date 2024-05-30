import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { first } from 'rxjs';
import {
    ApiCode,
    AuthResponse,
    LookupService,
    AuthenticationService,
    RPPService,
    EVariableService,
    FormSettingService,
    EvenBridgeService
} from '../../../_shared';
import {
    AlertService,
    SpinnerService
} from '../../../_helpers';


@Component({
    selector: 'app-batch',
    templateUrl: './batch.component.html',
    styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

    @Input()
    public batchDetail: any;
    public action: any;
    public payload: any;
    public errors: any;

    public uploading: any = false;
    public fileList: NzUploadFile[] = [];
    public sessionUser: AuthResponse;

    constructor(
        private rppService: RPPService,
        private lookupService: LookupService,
        private evenBridgeService: EvenBridgeService,
        private alertService: AlertService,
        private eVariableService: EVariableService,
        private formSettingService: FormSettingService,
        private spinnerService: SpinnerService,
        private drawerRef: NzDrawerRef<any>,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void { }

    public beforeUpload = (file: NzUploadFile): boolean => {
        this.errors = [];
        this.fileList = [];
        this.fileList = this.fileList.concat(file);
        return false;
    };

    public handleUpload(): void {
        this.spinnerService.show();
        this.errors = [];
        this.uploading = true;
        this.action = this.batchDetail.action;
        this.payload = this.batchDetail.data;
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
            formData.append('file', file);
        });
        if (this.action === 'Lookup' || this.action === 'SubLookup') {
            let payload = {
                parentLookupId: this.action === 'SubLookup' ? this.payload.parentLookupId : null,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            formData.append("data", JSON.stringify(payload));
            this.lookupService.uploadLookupData(formData)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    if (response?.status === ApiCode.ERROR) {
                        this.errors = response.data;
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    this.alertService.showError(error, ApiCode.ERROR);
                });
        } else if (this.action === 'Role' || this.action === 'Profile' || this.action === 'Permission') {
            let payload = {
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            formData.append("data", JSON.stringify(payload));
            if (this.action === 'Role') {
                this.rppService.uploadRole(formData)
                    .pipe(first())
                    .subscribe((response: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        if (response?.status === ApiCode.ERROR) {
                            this.errors = response.data;
                            this.alertService.showError(response.message, ApiCode.ERROR);
                            return;
                        }
                        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    }, (error: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        this.alertService.showError(error, ApiCode.ERROR);
                    });
            } else if (this.action === 'Profile') {
                this.rppService.uploadProfile(formData)
                    .pipe(first())
                    .subscribe((response: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        if (response?.status === ApiCode.ERROR) {
                            this.errors = response.data;
                            this.alertService.showError(response.message, ApiCode.ERROR);
                            return;
                        }
                        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    }, (error: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        this.alertService.showError(error, ApiCode.ERROR);
                    });
            } else if (this.action === 'Permission') {
                this.rppService.uploadPermission(formData)
                    .pipe(first())
                    .subscribe((response: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        if (response?.status === ApiCode.ERROR) {
                            this.errors = response.data;
                            this.alertService.showError(response.message, ApiCode.ERROR);
                            return;
                        }
                        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    }, (error: any) => {
                        this.spinnerService.hide();
                        this.uploading = false;
                        this.alertService.showError(error, ApiCode.ERROR);
                    });
            }
        } else if (this.action === 'EVariable') {
            let payload = {
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            formData.append("data", JSON.stringify(payload));
            this.eVariableService.uploadEnVariable(formData)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    if (response?.status === ApiCode.ERROR) {
                        this.errors = response.data;
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    this.alertService.showError(error, ApiCode.ERROR);
                });
        } else if (this.action === 'STT_FORM' || this.action === 'STT_SECTION' || this.action === 'STT_CONTROL') {
            let payload = {
                uploadType: this.action,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            formData.append("data", JSON.stringify(payload));
            this.formSettingService.uploadSTTCommon(formData)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    if (response?.status === ApiCode.ERROR) {
                        this.errors = response.data;
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    this.alertService.showError(error, ApiCode.ERROR);
                });
        } else if (this.action === 'EventBridge') {
            let payload = {
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            formData.append("data", JSON.stringify(payload));
            this.evenBridgeService.uploadEventBridge(formData)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    if (response?.status === ApiCode.ERROR) {
                        this.errors = response.data;
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.uploading = false;
                    this.alertService.showError(error, ApiCode.ERROR);
                });
        }
    }

    public close(): void {
        this.drawerRef.close();
    }

}
