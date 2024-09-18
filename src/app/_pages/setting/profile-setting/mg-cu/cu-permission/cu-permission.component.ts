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
    IPermission,
    APPLICATION_STATUS
} from '../../../../../_shared';
import {
    AlertService,
    CommomService,
} from '../../../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-cu-permission',
    templateUrl: './cu-permission.component.html',
    styleUrls: ['./cu-permission.component.css']
})
export class CUPermissionComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IPermission;

    public editAction = ActionType.EDIT;
    public APPLICATION_STATUS: ILookups;
    public permissionForm: FormGroup;
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
        this.permissionForm = this.fb.group({
            permissionName: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public editLookupForm(): void {
        this.permissionForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            permissionName: [this.editPayload.permissionName, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.permissionForm.invalid) {
            return;
        }
        let payload = {
            ...this.permissionForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addPermission(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updatePermission(payload);
        }
    }

    public addPermission(payload: any): void {
        this.rppService.addPermission(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                })
            );
    }

    public updatePermission(payload: any): void {
        this.rppService.updatePermission(payload).pipe(first())
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
