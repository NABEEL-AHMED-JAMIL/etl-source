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
    IGroup,
    ILookups,
    AuthResponse,
    AuthenticationService,
    LookupService,
    LOOKUP_TYPE,
    APPLICATION_STATUS,
    ApiCode,
    MgGroupService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-group',
    templateUrl: './cu-group.component.html',
    styleUrls: ['./cu-group.component.css']
})
export class CUGroupComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGroup;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public groupForm: FormGroup;
    public APPLICATION_STATUS: ILookups;
    public sessionUser: AuthResponse;


    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private mgGroupService: MgGroupService,
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
            this.addGroupForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editGroupForm();
        }
    }

    public addGroupForm(): any {
        this.spinnerService.show();
        this.groupForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.spinnerService.hide();
    }

    public editGroupForm(): void {
        this.spinnerService.show();
        this.groupForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addGroup();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateGroup();
        }
    }

    public addGroup(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.groupForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.groupForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.mgGroupService.addGroup(payload)
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

    public updateGroup(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.groupForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.groupForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.mgGroupService.updateGroup(payload)
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

    // convenience getter for easy access to form fields
    get group() {
        return this.groupForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }


}
