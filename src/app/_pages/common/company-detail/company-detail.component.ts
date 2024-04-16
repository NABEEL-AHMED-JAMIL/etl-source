import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AppUserService,
    AuthResponse,
    AuthenticationService,
    IAppUser,
    ICompany
} from 'src/app/_shared';


@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ICompany;
    @Input()
    public subUser: IAppUser;

    public companyForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private appUserService: AppUserService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addCompanyForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editCompanyForm();
        }
    }

    public addCompanyForm(): any {
        this.spinnerService.show();
        this.companyForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            address: ['', [Validators.required]],
            phone: ['', [Validators.required]]
        });
        this.spinnerService.hide();
    }

    public editCompanyForm(): void {
        this.spinnerService.show();
        this.companyForm = this.fb.group({
            id: [this.editPayload.id],
            name: [this.editPayload?.name, [Validators.required]],
            email: [this.editPayload?.email, [Validators.required]],
            address: [this.editPayload?.address, [Validators.required]],
            phone: [this.editPayload.phone, [Validators.required]]
        });
        this.spinnerService.hide();
    }

    public onSubmit(): void {
        this.spinnerService.show();
        if (this.companyForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {};
        if (this.subUser) {
            payload = {
                ...this.companyForm.value,
                sessionUser: {
                    username: this.subUser.username
                }
            }
        } else {
            payload = {
                ...this.companyForm.value,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
        }
        this.appUserService.updateAppUserCompany(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get company() {
        return this.companyForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}