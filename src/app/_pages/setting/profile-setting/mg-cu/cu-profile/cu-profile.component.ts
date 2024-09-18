import { Component, OnInit, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { first } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {
    LookupService,
    ApiCode,
    ActionType,
    LOOKUP_TYPE,
    AuthenticationService,
    AuthResponse,
    ILookups,
    RPPService,
    IProfile,
    APPLICATION_STATUS
} from '../../../../../_shared';
import {
    AlertService,
    CommomService
} from '../../../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-cu-profile',
    templateUrl: './cu-profile.component.html',
    styleUrls: ['./cu-profile.component.css']
})
export class CUProfileComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IProfile;

    public editAction = ActionType.EDIT;
    public APPLICATION_STATUS: ILookups;
    public profileForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        private rppService: RPPService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        if (this.actionType === ActionType.ADD) {
            this.addLookupForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editLookupForm();
        }
    }

    public addLookupForm(): any {
        this.profileForm = this.fb.group({
            profileName: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public editLookupForm(): void {
        this.profileForm = this.fb.group({
            uuid: [this.editPayload.uuid, Validators.required],
            profileName: [this.editPayload.profileName, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.profileForm.invalid) {
            return;
        }
        let payload = {
            ...this.profileForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addProfile(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateProfile(payload);
        }
    }

    public addProfile(payload: any): void {
        this.rppService.addProfile(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                })
            );
    }

    public updateProfile(payload: any): void {
        this.rppService.updateProfile(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
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
