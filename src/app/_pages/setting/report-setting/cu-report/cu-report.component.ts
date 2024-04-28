import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    AuthResponse,
    AuthenticationService,
    EVariableService,
    ILookups,
    IReportSetting,
    LOOKUP_TYPE,
    LookupService,
    APPLICATION_STATUS,
    ReportSettingService,
    ApiCode
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-report',
    templateUrl: './cu-report.component.html',
    styleUrls: ['./cu-report.component.css']
})
export class CUReportComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IReportSetting;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public reportSettingForm: FormGroup;
    public sessionUser: AuthResponse;
    public APPLICATION_STATUS: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private envVarService: EVariableService,
        private reportSettingService: ReportSettingService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        if (this.actionType === ActionType.ADD) {
            this.addReportSettingForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editReportSettingForm();
        }
    }

    public addReportSettingForm(): any {
        this.spinnerService.show();
        this.reportSettingForm = this.fb.group({
        });
        this.spinnerService.hide();
    }

    public editReportSettingForm(): void {
        this.spinnerService.show();
        this.reportSettingForm = this.fb.group({
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addReportSetting();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateReportSetting();
        }
    }

    public addReportSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.reportSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.reportSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.reportSettingService.addReportSetting(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    public updateReportSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.reportSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.reportSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.reportSettingService.updateReportSetting(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    // convenience getter for easy access to form fields
    get reportSetting() {
        return this.reportSettingForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
