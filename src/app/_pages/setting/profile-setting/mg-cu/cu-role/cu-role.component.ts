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
    IRole,
    RPPService,
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
    selector: 'app-cu-role',
    templateUrl: './cu-role.component.html',
    styleUrls: ['./cu-role.component.css']
})
export class CURoleComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IRole;

    public editAction = ActionType.EDIT;
    public APPLICATION_STATUS: ILookups;
    public roleForm: FormGroup;
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
        this.roleForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public editLookupForm(): void {
        this.roleForm = this.fb.group({
            uuid: [this.editPayload.uuid, Validators.required],
            name: [this.editPayload.name, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.roleForm.invalid) {
            return;
        }
        let payload = {
            ...this.roleForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addRole(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateRole(payload);
        }
    }

    public addRole(payload: any): void {
        this.rppService.addRole(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }));
    }

    public updateRole(payload: any): void {
        this.rppService.updateRole(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }


}
