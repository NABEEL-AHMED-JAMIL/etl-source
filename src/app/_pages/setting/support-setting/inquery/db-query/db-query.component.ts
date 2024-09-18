import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { first } from 'rxjs';
import {
    AlertService,
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

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-db-query',
    templateUrl: './db-query.component.html',
    styleUrls: ['./db-query.component.css']
})
export class DBQueryComponent implements OnInit {

    // search detail
    public searchDetails: any;
    public sessionUser: AuthResponse;
    public tableQueryForm!: UntypedFormGroup;
    // query response
    public queryResponse: IQuery;
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
        private settingService: SettingService,
        private authenticationService: AuthenticationService) {
            this.sessionUser = this.authenticationService.currentUserValue;
            if (this.commomService.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                this.isSuperAdmin = true;
                this.selectedUser = this.sessionUser.username;
            }
    }

    ngOnInit(): void {
        this.tableQueryFormInit();
        if (this.commomService.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
            this.fetchAllQueryInquiryAccessUser();
        }
        this.fetchAllQueryInquiry({});
    }

    public onSelectionUserChange(): void {
        // Handle the selection change here
        let selectedUser = this.selectedUser ? this.selectedUser : '';
        this.selectedQueryInquiry = '';
        this.queryResponse = undefined;
        this.tableQueryForm = this.fb.group({
            query: [this.selectedQueryInquiry, Validators.required]
        });
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
        let query = this.selectedQueryInquiry ? this.selectedQueryInquiry?.query: '';
        this.queryResponse = undefined;
        this.tableQueryForm = this.fb.group({
            query: [query, Validators.required]
        });
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
        drawerRef.afterClose
        .subscribe(data => {
            if (this.commomService.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                this.fetchAllQueryInquiryAccessUser();
            }
            this.fetchAllQueryInquiry({});
        });
    }

    public tableQueryFormInit(): any {
        this.tableQueryForm = this.fb.group({
            query: ['', Validators.required]
        });
    }

    public clearResult(): any {
        this.queryResponse = undefined;
        this.selectedQueryInquiry = '';
    }

    public dynamicQueryResponse(): void {
        if (this.tableQueryForm.invalid) {
            return;
        }
        this.settingService.dynamicQueryResponse(this.tableQueryForm.value).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.queryResponse = response.data;
                })
            );
    }

    public exportExcel(): void {
        this.settingService.downloadDynamicQueryFile(this.tableQueryForm.value).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.commomService.downLoadFile(response);
                })
            );
    }

    public fetchAllQueryInquiry(payload: any): void {
        this.settingService.fetchAllQueryInquiry(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.queryInquirys = response.data;
                })
            );
    }

    public fetchAllQueryInquiryAccessUser(): void {
        this.settingService.fetchAllQueryInquiryAccessUser().pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.accessUserList = response.data.map((user: any) => {
                        return {
                            name: `${user.fullname} & Querys [${user.count}]`,
                            value: user.username
                        };
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