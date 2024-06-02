import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
    IEnVariables
} from 'src/app/_shared';

@Component({
    selector: 'app-env-variable-value',
    templateUrl: './env-variable-value.component.html',
    styleUrls: ['./env-variable-value.component.css']
})
export class EnvVariableValueComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IEnVariables;

    public envValueForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzModalRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService,
        private appUserService: AppUserService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.EDIT) {
            this.editEnvVaraibleForm();
        }
    }

    public editEnvVaraibleForm(): void {
        this.spinnerService.show();
        this.envValueForm = this.fb.group({
            id: [this.editPayload.id],
            envKey: [this.editPayload?.envKey, [Validators.required]],
            envValue: [this.editPayload?.envValue, [Validators.required]]
        });
        this.envValueForm.controls['envKey'].disable();
        this.spinnerService.hide();
    }

    public onSubmit(): void {
        this.spinnerService.show();
        if (this.envValueForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.envValueForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.appUserService.updateAppUserEnvVariable(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get envValue() {
        return this.envValueForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}