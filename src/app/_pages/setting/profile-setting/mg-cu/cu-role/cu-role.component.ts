import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    SpinnerService
} from '../../../../../_helpers';


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

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public roleForm: FormGroup;
    public APPLICATION_STATUS: ILookups;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private rppService: RPPService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
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
        this.spinnerService.show();
        this.roleForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.spinnerService.hide();
    }

    public editLookupForm(): void {
        this.spinnerService.show();
        this.roleForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addRole();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateRole();
        }
    }

    public addRole(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.roleForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.roleForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.rppService.addRole(payload)
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
            }, (error: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public updateRole(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.roleForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.roleForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.rppService.updateRole(payload)
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
            }, (error: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get role() {
        return this.roleForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
