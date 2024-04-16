import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {
    LookupService,
    ApiCode,
    ActionType,
    ILookupData,
    LOOKUP_TYPE,
    AuthenticationService,
    AuthResponse,
    ILookups
} from '../../../../../_shared';
import {
    AlertService,
    CommomService,
    SpinnerService
} from '../../../../../_helpers';


@Component({
    selector: 'app-cu-lookup',
    templateUrl: './cu-lookup.component.html',
    styleUrls: ['./cu-lookup.component.css']
})
export class CULookupComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public parentLookupId: any;
    @Input()
    public editPayload: ILookupData;

    public loading: boolean = false;
    public lookupDataForm: FormGroup;
    public UI_LOOKUP: ILookups;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.UI_LOOKUP
        }).subscribe((data) => {
            this.UI_LOOKUP = data;
        });
        if (this.actionType === ActionType.ADD) {
            this.addLookupForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editLookupForm();
        }
    }

    public addLookupForm(): any {
        this.spinnerService.show();
        this.lookupDataForm = this.fb.group({
            lookupType: ['', Validators.required],
            lookupValue: ['', Validators.required],
            lookupCode: ['', Validators.required],
            description: [''],
            lookupEngName: [''],
            lookupArbName: [''],
            uiLookup: [0, Validators.required],
            parentLookupId: [this.parentLookupId]
        });
        this.spinnerService.hide();
    }

    public editLookupForm(): void {
        this.spinnerService.show();
        this.lookupDataForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            lookupType: [this.editPayload.lookupType, Validators.required],
            lookupValue: [this.editPayload.lookupValue, Validators.required],
            lookupCode: [this.editPayload.lookupCode, Validators.required],
            description: [this.editPayload.description],
            uiLookup: [this.editPayload.uiLookup.lookupCode],
            parentLookupId: [this.parentLookupId]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addLookupData();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateLookupData();
        }
    }

    public addLookupData(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.lookupDataForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.lookupDataForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.lookupService.addLookupData(payload)
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

    public updateLookupData(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.lookupDataForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.lookupDataForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.lookupService.updateLookupData(payload)
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
    get lookupData() {
        return this.lookupDataForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
