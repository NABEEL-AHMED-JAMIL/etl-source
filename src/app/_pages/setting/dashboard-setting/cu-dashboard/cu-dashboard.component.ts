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

/**
 * @author Nabeel Ahmed
 */
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

    public editAction = ActionType.EDIT;
    public dashboardSettingForm: FormGroup;
    public sessionUser: AuthResponse;
    // ilookup
    public APPLICATION_STATUS: ILookups;
    public DASHBOARD_TYPE: ILookups;
    public DASHBOARD_GROUP: ILookups;
    public UI_LOOKUP: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        private envVarService: EVariableService,
        private dashboardService: DashboardService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;;
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
        let payload = {
            envKey: E_VARAIABLE.DASHBOARD_GROUP
        };
        this.envVarService.fetchUserEnvByEnvKey(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.DASHBOARD_GROUP = response.data;
                })
            );
    }

    public addDashboardSettingForm(): any {
        this.dashboardSettingForm = this.fb.group({
            name: ['', Validators.required],
            groupType: ['', Validators.required],
            description: ['', Validators.required],
            boardType: ['', Validators.required],
            dashboardUrl: ['', Validators.required],
            iframe: ['', Validators.required],
        });
    }

    public editDashboardSettingForm(): void {
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
    }

    public submit(): void {
        if (this.dashboardSettingForm.invalid) {
            return;
        }
        let payload = {
            ...this.dashboardSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        if (this.actionType === ActionType.ADD) {
            this.addDashboardSetting(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateDashboardSetting(payload);
        }
    }

    public addDashboardSetting(payload: any): void {
        this.dashboardService.addDashboardSetting(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.closeDrawer();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    public updateDashboardSetting(payload: any): void {
        this.dashboardService.updateDashboardSetting(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.closeDrawer();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    // convenience getter for easy access to form fields
    get dashboardSetting() {
        return this.dashboardSettingForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
