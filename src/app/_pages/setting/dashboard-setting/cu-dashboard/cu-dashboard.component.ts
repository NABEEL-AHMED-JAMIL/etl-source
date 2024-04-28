import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    IDashboardSetting,
    AuthResponse,
    ILookups,
    AuthenticationService,
    LookupService,
    DashboardService,
    LOOKUP_TYPE,
    APPLICATION_STATUS,
    ApiCode,
    E_VARAIABLE,
    EVariableService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-dashboard',
    templateUrl: './cu-dashboard.component.html',
    styleUrls: ['./cu-dashboard.component.css']
})
export class CUDashboardComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IDashboardSetting;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public dashboardSettingForm: FormGroup;
    public sessionUser: AuthResponse;
    public APPLICATION_STATUS: ILookups;
    public DASHBOARD_TYPE: ILookups;
    public DASHBOARD_GROUP: ILookups;
    public UI_LOOKUP: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private envVarService: EVariableService,
        private dashboardService: DashboardService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchUserEnvByEnvKey();
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.UI_LOOKUP
        }).subscribe((data) => {
            this.UI_LOOKUP = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.DASHBOARD_TYPE
        }).subscribe((data) => {
            this.DASHBOARD_TYPE = data;
        });
        if (this.actionType === ActionType.ADD) {
            this.addDashboardSettingForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editDashboardSettingForm();
        }
    }

    public fetchUserEnvByEnvKey(): any {
        this.spinnerService.show();
        let payload = {
            envKey: E_VARAIABLE.DASHBOARD_GROUP,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.envVarService.fetchUserEnvByEnvKey(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.DASHBOARD_GROUP = response.data;
                this.spinnerService.hide();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public addDashboardSettingForm(): any {
        this.spinnerService.show();
        this.dashboardSettingForm = this.fb.group({
            name: ['', Validators.required],
            groupType: ['', Validators.required],
            description: ['', Validators.required],
            boardType: ['', Validators.required],
            dashboardUrl: ['', Validators.required],
            iframe: ['', Validators.required],
        });
        this.spinnerService.hide();
    }

    public editDashboardSettingForm(): void {
        this.spinnerService.show();
        this.dashboardSettingForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            groupType: [this.editPayload.groupType?.lookupType, Validators.required],
            description: [this.editPayload.description, Validators.required],
            boardType: [this.editPayload.boardType?.lookupCode, Validators.required],
            dashboardUrl: [this.editPayload.dashboardUrl, Validators.required],
            iframe: [this.editPayload.iframe?.lookupCode, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addDashboardSetting();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateDashboardSetting();
        }
    }

    public addDashboardSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.dashboardSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.dashboardSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.dashboardService.addDashboardSetting(payload)
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

    public updateDashboardSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.dashboardSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.dashboardSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.dashboardService.updateDashboardSetting(payload)
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
    get dashboardSetting() {
        return this.dashboardSettingForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
