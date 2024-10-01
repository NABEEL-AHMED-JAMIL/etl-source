import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import { CUOrgComponent } from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    IOrganization,
    IStaticTable,
    ILookups,
    LOOKUP_TYPE,
    LookupService,
    OrganizationService,
    AuthenticationService,
    AppDashboardThemeService,
} from 'src/app/_shared';

export interface SearchPayload {
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;
    user?: {
        [key: string]: any; // Adjust the type according to your requirements
    };
}

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-org',
    templateUrl: './mg-org.component.html',
    styleUrls: ['./mg-org.component.css']
})
export class MgOrgComponent implements OnInit {

    private readonly USERNAME_FILTER = 'username';
    private readonly EMAIL_FILTER = 'email';
    // start & end date detail
    public startDate: any;
    public endDate: any;
    // page detail
    public pageNumber: number = 1;
    public pageSize: number = 4;
    public totalRecorad: number;
    // form deatil
    public ORG_FILTER_TYPE: ILookups;
    public dynamicForm: FormGroup;
    public selectedFiledName: string = 'username';  // Default control name
    // session user reponse
    public sessionUser: AuthResponse;
    public organizations: IOrganization[];
    // statistic
    public staticTable: IStaticTable = {
        tableId: 'mg-org-id',
        title: 'My Organization',
        size: 'small',
        headerButton: [
            {
                type: 'plus-circle',
                color: 'red',
                spin: false,
                tooltipTitle: 'Add',
                action: ActionType.ADD
            },
            {
                type: 'reload',
                color: 'red',
                spin: false,
                tooltipTitle: 'Refresh',
                action: ActionType.RE_FRESH
            }
        ]
    };

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        public commomService: CommomService,
        private lookupService: LookupService,
        private organizationService: OrganizationService,
        private appDashboardThemeService: AppDashboardThemeService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.ORG_FILTER_TYPE
        }).subscribe((data) => {
            this.ORG_FILTER_TYPE = data;
        });
        // Initialize the form with the default control
        this.intiForm();
        // Listen for changes in filterType and update the form controls accordingly
        this.dynamicForm.get('filterType')?.valueChanges
            .subscribe(selectedType => {
                this.dynamicForm.get('filedValue')?.reset();
            });
        this.searchResult();
    }

    public intiForm(): any {
        // Initialize the form with the default control
        this.dynamicForm = this.fb.group({
            filterType: ['username', Validators.required],
            filedValue: [''],
            startDate: [this.startDate, Validators.required],
            endDate: [this.endDate, Validators.required]
        });
    }

    public searchResult(): void {
        this.pageNumber = 1;
        this.fetchAllOrgAccount(this.createPayload());
    }

    public clearForm(): void {
        this.pageNumber = 1;
        this.intiForm();
        this.fetchAllOrgAccount(this.createPayload());
    }

    public onPageIndexChange(newPage: number): void {
        this.pageNumber = newPage;
        this.fetchAllOrgAccount(this.createPayload());
    }

    private createPayload(): SearchPayload {
        return {
            pageNumber: this.pageNumber - 1,
            pageSize: this.pageSize,
            startDate: this.dynamicForm.get('startDate')?.value,
            endDate: this.dynamicForm.get('endDate')?.value,
            ...this.getUserPayload()
        };
    }

    private getUserPayload(): any {
        const filterTypeValue = this.dynamicForm.get('filterType')?.value;
        const filedValue = this.dynamicForm.get('filedValue')?.value;
        let payload = null;
        if ((filterTypeValue === this.USERNAME_FILTER || filterTypeValue === this.EMAIL_FILTER) && filedValue) {
            payload = {
                user: {
                    [filterTypeValue]: filedValue
                }
            }
        } else if (filterTypeValue && filedValue) {
            payload = {
                [filterTypeValue]: filedValue
            }
        }
        return payload;
    }

    private initializeStatistics(organization: IOrganization): void {
        const orgStatistic = organization.orgStatistic;
        organization.SERVICE_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Service Setting', orgStatistic['SERVICE_SETTING_STATISTICS']?.data || []);
        organization.DASHBOARD_AND_REPORT_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Dashboard & Report Setting', orgStatistic['DASHBOARD_AND_REPORT_SETTING_STATISTICS']?.data || []);
        organization.FORM_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Form Setting', orgStatistic['FORM_SETTING_STATISTICS']?.data || []);
        organization.PROFILE_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Profile Setting', orgStatistic['PROFILE_SETTING_STATISTICS']?.data || []);
        if (orgStatistic['SESSION_COUNT_STATISTICS']?.data) {
            organization.SESSION_COUNT_STATISTICS = this.appDashboardThemeService.fillAxisChartPayload(orgStatistic['SESSION_COUNT_STATISTICS']?.data);
        }
    }

    private initCharts(organization: IOrganization, index: number): void {
        setTimeout(() => {
            // Initialize charts only if they haven't been initialized yet
            const orgStatistic = organization.orgStatistic;
            this.appDashboardThemeService.initChart(`SERVICE_SETTING_STATISTICS_${index}`, organization.SERVICE_SETTING_STATISTICS);
            this.appDashboardThemeService.initChart(`DASHBOARD_AND_REPORT_SETTING_STATISTICS_${index}`, organization.DASHBOARD_AND_REPORT_SETTING_STATISTICS);
            this.appDashboardThemeService.initChart(`FORM_SETTING_STATISTICS_${index}`, organization.FORM_SETTING_STATISTICS);
            this.appDashboardThemeService.initChart(`PROFILE_SETTING_STATISTICS_${index}`, organization.PROFILE_SETTING_STATISTICS);
            if (orgStatistic['SESSION_COUNT_STATISTICS']?.data) {
                this.appDashboardThemeService.initChart(`SESSION_COUNT_STATISTICS_${index}`, organization.SESSION_COUNT_STATISTICS);
            }
        }, 0);
    }

    public buttonEvent(payload: any): void {
        if (ActionType.ADD === payload.action) {
        } else if (ActionType.RE_FRESH === payload.action) {
            this.onPageIndexChange(this.pageNumber);
        }
    }

    public openCuProfile(actionType: ActionType, editPayload: any): void {
    }

    /**
     * Method use to view the org users
     * */
    public viewOrgUser(payload: any): void {
        console.log("viewOrgUser", payload);
    }

    /**
     * Method use to edit the org
     * */
    public editOrgAccount(payload: any): void {
        console.log("editOrgAccount", payload);
    }

    /**
     * method use to change the org status
     * active | in active
     * */
    public changeOrgAccountStatus(payload: any): void {
        console.log("changeOrgAccountStatus", payload);
    }

    /**
     * Method use to delte the org account
     */
    public deleteOrgAccount(payload: any): void {
        console.log("deleteOrgAccount", payload);
    }

    public fetchAllOrgAccount(payload: any): any {
        this.organizationService.fetchAllOrgAccount(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    let paginatedOrgResponse = response.data;
                    this.organizations = paginatedOrgResponse.content;
                    this.totalRecorad = paginatedOrgResponse?.totalElements;
                    this.pageSize = paginatedOrgResponse?.pageable.pageSize;
                    this.organizations.forEach((organization, index) => {
                        this.initializeStatistics(organization);
                        this.initCharts(organization, index);
                    });
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
