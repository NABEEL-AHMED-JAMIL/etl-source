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
    APPLICATION_STATUS,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    EVariableService,
    E_VARAIABLE,
    FORM_TYPE,
    FormSettingService,
    IReportSetting,
    IGenFrom,
    ILookups,
    LOOKUP_TYPE,
    LookupService,
    ReportSettingService,
    IDashboardSetting,
    DashboardService,
    DASHBOARD_TYPE
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-form',
    templateUrl: './cu-form.component.html',
    styleUrls: ['./cu-form.component.css']
})
export class CUFormComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenFrom;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public genFormForm: FormGroup;
    public sessionUser: AuthResponse;

    // report and dashboard
    private reportList: IReportSetting[] = [];
    private dashboardList: IDashboardSetting[] = [];

    public SERVICE_FORM = FORM_TYPE.SERVICE_FORM;
    public APPLICATION_STATUS: ILookups;
    public FORM_TYPE: ILookups;
    public HOME_PAGE: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private envVarService: EVariableService,
        public commomService: CommomService,
        private dashboardService: DashboardService,
        private reportSettingService: ReportSettingService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchUserEnvByEnvKey();
        this.fetchAllReportSetting();
        this.fetchAllDashboardSettingByType();
        // APPLICATION_STATUS
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        // FORM_TYPE
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.FORM_TYPE
        }).subscribe((data) => {
            this.FORM_TYPE = data;
        });
        if (this.actionType === ActionType.ADD) {
            this.addGenFormForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editGenFormForm();
        }
    }

    public fetchUserEnvByEnvKey(): any {
        this.spinnerService.show();
        let payload = {
            envKey: E_VARAIABLE.ENV_HOME_PAGE,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.envVarService.fetchUserEnvByEnvKey(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.HOME_PAGE = response.data;
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // fetch all lookup
    public fetchAllReportSetting(): any {
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.spinnerService.show();
        this.reportSettingService.fetchAllReportSetting(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.reportList = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // fetch all lookup
    public fetchAllDashboardSettingByType(): any {
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            },
            boardType: DASHBOARD_TYPE.CUSTOM_DASHBOARD
        }
        this.spinnerService.show();
        this.dashboardService.fetchAllDashboardSettingByType(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.dashboardList = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public addGenFormForm(): any {
        this.spinnerService.show();
        this.genFormForm = this.fb.group({
            formName: ['', Validators.required],
            description: ['', [Validators.required]],
            formType: [FORM_TYPE.SERVICE_FORM, [Validators.required]],
            homePage: [],
            serviceId: [],
        });
        this.spinnerService.hide();
    }

    public editGenFormForm(): void {
        this.spinnerService.show();
        this.genFormForm = this.fb.group({
            id: [this.editPayload.id, [Validators.required]],
            formName: [this.editPayload.formName, Validators.required],
            description: [this.editPayload.description, [Validators.required]],
            status: [this.editPayload.status.lookupCode, [Validators.required]],
            formType: [this.editPayload.formType.lookupCode, [Validators.required]],
            homePage: [this.editPayload.homePage ? this.editPayload.homePage.lookupType : ''],
            serviceId: [this.editPayload.serviceId]
        });
        this.genFormForm.get('formType').disable();
        this.spinnerService.hide();
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editForm();
        }
    }

    public addForm(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genFormForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genFormForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.addForm(payload)
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
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public editForm(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genFormForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genFormForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.editForm(payload)
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
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get genForm() {
        return this.genFormForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
