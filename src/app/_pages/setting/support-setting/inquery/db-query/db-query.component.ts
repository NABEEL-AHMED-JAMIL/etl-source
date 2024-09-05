import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService,
    CommomService
} from '../../../../../_helpers';
import {
    ApiCode,
    APP_ADMIN,
    AuthenticationService,
    AuthResponse,
    IKeyValue,
    IQuery,
    IQueryInquiry,
    SettingService
} from '../../../../../_shared';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { QueryInquiryComponent } from 'src/app/_pages';


@Component({
    selector: 'app-db-query',
    templateUrl: './db-query.component.html',
    styleUrls: ['./db-query.component.css']
})
export class DBQueryComponent implements OnInit {

    // search detail
    public searchDetails: any;
    public sessionUser: AuthResponse;
    public sessionUserRoles: any;
    public tableQueryForm!: UntypedFormGroup;
    // query response
    public queryResponse: IQuery;
    public isExportLoading: boolean = false;
    public selectedQueryInquiry: any;
    public queryInquirys: IQueryInquiry[] = [];
    // user list response
    public selectedUser: any;
    public isSuperAdmin: boolean = false;
    public accessUserList: IKeyValue[] = [];

    constructor(private fb: UntypedFormBuilder,
        private alertService: AlertService,
        private drawerService: NzDrawerService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private settingService: SettingService,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                    this.sessionUserRoles = currentUser.roles;
                    if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                        this.isSuperAdmin = true;
                        this.selectedUser = this.sessionUser.username;
                    }
                });
    }

    ngOnInit(): void {
        this.tableQueryFormInit();
        if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
            this.fetchAllQueryInquiryAccessUser();
        }
        this.fetchAllQueryInquiry({});
    }

    public onSelectionUserChange(): void {
        // Handle the selection change here
        this.spinnerService.show();
        let selectedUser = this.selectedUser ? this.selectedUser : '';
        this.selectedQueryInquiry = '';
        this.queryResponse = undefined;
        this.tableQueryForm = this.fb.group({
            query: [this.selectedQueryInquiry, Validators.required]
        });
        this.spinnerService.hide();
        if (selectedUser) {
            this.fetchAllQueryInquiry({
                usernames: [selectedUser]
            });
        } else {
            this.fetchAllQueryInquiry({});
        }
    }

    public onSelectionQueryInquiryChange(): void {
        // Handle the selection change here
        this.spinnerService.show();
        let query = this.selectedQueryInquiry ? this.selectedQueryInquiry?.query: '';
        this.queryResponse = undefined;
        this.tableQueryForm = this.fb.group({
            query: [query, Validators.required]
        });
        this.spinnerService.hide();
    }

    public openQueryInquiry(): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: 'Mg Query Inquiry',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzWidth: '1000px',
            nzContent: QueryInquiryComponent
        });
        drawerRef.afterClose.subscribe(data => {
            this.isExportLoading = false;
            if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                this.fetchAllQueryInquiryAccessUser();
            }
            this.fetchAllQueryInquiry({});
        });
    }

    public tableQueryFormInit(): any {
        this.spinnerService.show();
        this.tableQueryForm = this.fb.group({
            query: ['', Validators.required]
        });
        this.spinnerService.hide();
    }

    public clearResult(): any {
        this.spinnerService.show();
        this.queryResponse = undefined;
        this.selectedQueryInquiry = '';
        this.spinnerService.hide();
    }

    public dynamicQueryResponse(): void {
        this.spinnerService.show();
        if (this.tableQueryForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        this.settingService.dynamicQueryResponse(this.tableQueryForm.value)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;   
                }
                this.queryResponse = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public exportExcel(): void {
        this.isExportLoading = true;
        this.spinnerService.show();
        this.settingService.downloadDynamicQueryFile(this.tableQueryForm.value)
            .pipe(first())
            .subscribe((response: any) => {
                this.isExportLoading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;   
                }
                this.commomService.downLoadFile(response);
            }, (response: any) => {
                this.isExportLoading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchAllQueryInquiry(payload: any): void {
        this.spinnerService.show();
        this.settingService.fetchAllQueryInquiry(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;   
                }
                this.queryInquirys = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchAllQueryInquiryAccessUser(): void {
        this.spinnerService.show();
        this.settingService.fetchAllQueryInquiryAccessUser()
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;   
                }
                this.accessUserList = response.data.map((user: any) => {
                    return {
                        name: `${user.fullname} & Querys [${user.count}]`,
                        value: user.username
                    };
                });
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public hasRoleAccess(userRole: any): boolean {
        return this.sessionUserRoles.some((role: any) => userRole.includes(role));
    }

}