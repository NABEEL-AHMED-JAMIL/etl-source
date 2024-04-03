import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import { AlertService, SpinnerService, CommomService } from 'src/app/_helpers';
import {
    ActionType,
    IEnVariables,
    ILookups,
    AuthResponse,
    AuthenticationService,
    LookupService,
    LOOKUP_TYPE,
    APPLICATION_STATUS,
    ApiCode,
    EVariableService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-evariable',
    templateUrl: './cu-evariable.component.html',
    styleUrls: ['./cu-evariable.component.css']
})
export class CUEvariableComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IEnVariables;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public enVariablesForm: FormGroup;
    public APPLICATION_STATUS: ILookups;
    public sessionUser: AuthResponse;


    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private eVariableService: EVariableService,
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
            this.addEnVariablesForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editEnVariablesForm();
        }
    }

    public addEnVariablesForm(): any {
        this.spinnerService.show();
        this.enVariablesForm = this.fb.group({
            envKey: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.spinnerService.hide();
    }

    public editEnVariablesForm(): void {
        this.spinnerService.show();
        this.enVariablesForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            envKey: [this.editPayload.envKey, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addEnVariable();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateEnVariable();
        }
    }

    public addEnVariable(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.enVariablesForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.enVariablesForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.eVariableService.addEnVariable(payload)
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

    public updateEnVariable(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.enVariablesForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.enVariablesForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.eVariableService.updateEnVariable(payload)
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
    get enVariables() {
        return this.enVariablesForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
