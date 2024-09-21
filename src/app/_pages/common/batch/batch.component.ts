import { Component, OnInit, Input } from '@angular/core';
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
} from '../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
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
        private alertService: AlertService,
        private rppService: RPPService,
        private lookupService: LookupService,
        private evenBridgeService: EvenBridgeService,
        private eVariableService: EVariableService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue;
    }

    ngOnInit(): void { }

    public beforeUpload = (file: NzUploadFile): boolean => {
        this.errors = [];
        this.fileList = [file];
        return false;
    };

    public handleUpload(): void {
        this.uploading = true;
        this.errors = [];
        this.action = this.batchDetail.action;
        this.payload = this.batchDetail.data;
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
            formData.append('file', file);
        });
        formData.append("data", JSON.stringify(this.getPayload()));
        this.uploadData(formData).subscribe((response: any) => this.handleSuccess(response));
    }

    private getPayload() {
        switch (this.action) {
            case 'Lookup':
            case 'SubLookup':
                return {
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.action === 'SubLookup' ? this.payload.parentLookupId : null
                };
            case 'STT_FORM':
            case 'STT_SECTION':
            case 'STT_CONTROL':
                return {
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    uploadType: this.action
                };
            default:
                return {};
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
        this.uploading = false;
        if (response?.status === ApiCode.ERROR) {
            this.errors = response.data;
            this.alertService.showError(response.message, ApiCode.ERROR);
        } else {
            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
        }
    }

}
