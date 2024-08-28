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
} from '../../../../_helpers';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    IQuery,
    IQueryInquiry,
    SettingService
} from '../../../../_shared';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { QueryInquiryComponent } from 'src/app/_pages';


@Component({
    selector: 'app-db-query',
    templateUrl: './db-query.component.html',
    styleUrls: ['./db-query.component.css']
})
export class DBQueryComponent implements OnInit {

    public sessionUser: AuthResponse;
    // search detail
    public searchDetails: any;
    public tableQueryForm!: UntypedFormGroup;
    // query response
    public queryResponse: IQuery;
    public isExportLoading: boolean = false;

    public selectedValue: any;
    public queryInquirys: IQueryInquiry[] = [];

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
                });
    }

    ngOnInit(): void {
        this.tableQueryFormInit();
        this.fetchAllQueryInquiry(
            {
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
        );
    }

    public onSelectionChange(): void {
        // Handle the selection change here
        this.spinnerService.show();
        let query = this.selectedValue ? this.selectedValue?.query: '';
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
            this.fetchAllQueryInquiry(
                {
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                }
            );
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
        this.selectedValue = '';
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

}