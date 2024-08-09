import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { first } from 'rxjs/operators';
import {
    ApiCode,
    AuthResponse,
    LookupService,
    AuthenticationService,
    RPPService,
    EVariableService,
    FormSettingService,
    EvenBridgeService,
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

    public uploading = false;
    public fileList: NzUploadFile[] = [];
    public sessionUser: AuthResponse;

    constructor(
        private drawerRef: NzDrawerRef<any>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private rppService: RPPService,
        private lookupService: LookupService,
        private evenBridgeService: EvenBridgeService,
        private eVariableService: EVariableService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService?.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void { }

    public beforeUpload = (file: NzUploadFile): boolean => {
        this.errors = [];
        this.fileList = [file];
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
        formData.append("data", JSON.stringify(this.getPayload()));
        this.uploadData(formData).subscribe(
            (response: any) => this.handleSuccess(response),
            (response: any) => this.handleError(response)
        );
    }

    private getPayload() {
        const basePayload = {
            sessionUser: {
                username: this.sessionUser.username
            }};
        switch (this.action) {
            case 'Lookup':
            case 'SubLookup':
                return {
                    ...basePayload,
                    parentLookupId: this.action === 'SubLookup' ? this.payload.parentLookupId : null
                };
            case 'STT_FORM':
            case 'STT_SECTION':
            case 'STT_CONTROL':
                return { ...basePayload, uploadType: this.action };
            default:
                return basePayload;
        }
    }

    private uploadData(formData: FormData) {
        switch (this.action) {
            case 'Lookup':
            case 'SubLookup':
                return this.lookupService.uploadLookupData(formData).pipe(first());
            case 'Role':
                return this.rppService.uploadRole(formData).pipe(first());
            case 'Profile':
                return this.rppService.uploadProfile(formData).pipe(first());
            case 'Permission':
                return this.rppService.uploadPermission(formData).pipe(first());
            case 'EVariable':
                return this.eVariableService.uploadEnVariable(formData).pipe(first());
            case 'STT_FORM':
            case 'STT_SECTION':
            case 'STT_CONTROL':
                return this.formSettingService.uploadSTTCommon(formData).pipe(first());
            case 'EventBridge':
                return this.evenBridgeService.uploadEventBridge(formData).pipe(first());
            default:
                throw new Error(`Unsupported action type: ${this.action}`);
        }
    }

    private handleSuccess(response: any) {
        this.spinnerService.hide();
        this.uploading = false;
        if (response?.status === ApiCode.ERROR) {
            this.errors = response.data;
            this.alertService.showError(response.message, ApiCode.ERROR);
        } else {
            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
        }
    }

    private handleError(response: any) {
        this.spinnerService.hide();
        this.uploading = false;
        this.alertService.showError(response.error.message, ApiCode.ERROR);
    }

    public close(): void {
        this.drawerRef.close();
    }
}
