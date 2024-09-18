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
    AuthResponse,
    ILookups,
    AuthenticationService,
} from '../../../../../_shared';
import {
    AlertService,
    CommomService,
} from '../../../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
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

    public sessionUser: AuthResponse;
    public UI_LOOKUP: ILookups;
    public lookupDataForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
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
    }

    public editLookupForm(): void {
        this.lookupDataForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            lookupType: [this.editPayload.lookupType, Validators.required],
            lookupValue: [this.editPayload.lookupValue, Validators.required],
            lookupCode: [this.editPayload.lookupCode, Validators.required],
            description: [this.editPayload.description],
            uiLookup: [this.editPayload.uiLookup.lookupCode],
            parentLookupId: [this.parentLookupId]
        });
    }

    public submit(): void {
        if (this.lookupDataForm.invalid) {
            return;
        }
        let payload = {
            ...this.lookupDataForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        if (this.actionType === ActionType.ADD) {
            this.addLookupData(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateLookupData(payload);
        }
    }

    public addLookupData(payload: any): void {
        this.lookupService.addLookupData(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    public updateLookupData(payload: any): void {
        this.lookupService.updateLookupData(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
