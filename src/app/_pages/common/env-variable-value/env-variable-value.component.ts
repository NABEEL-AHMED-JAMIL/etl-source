import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
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

/**
 * @author Nabeel Ahmed
 */
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
        private modelRef: NzModalRef<void>,
        private alertService: AlertService,
        public commomService: CommomService,
        private appUserService: AppUserService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.EDIT) {
            this.editEnvVaraibleForm();
        }
    }

    public editEnvVaraibleForm(): void {
        this.envValueForm = this.fb.group({
            uuid: [this.editPayload.uuid],
            envKey: [this.editPayload?.envKey, [Validators.required]],
            envValue: [this.editPayload?.envValue, [Validators.required]]
        });
        this.envValueForm.controls['envKey'].disable();
    }

    public onSubmit(): void {
        if (this.envValueForm.invalid) {
            return;
        }
        let payload = {
            ...this.envValueForm.getRawValue()
        }
        this.appUserService.updateAppUserEnvVariable(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.modelRef.close();
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