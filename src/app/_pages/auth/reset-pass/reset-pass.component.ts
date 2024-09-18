import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {AlertService } from '../../../_helpers';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import jwt_decode from "jwt-decode";

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

    public tokenPayload: any;
    public resetPassForm: UntypedFormGroup;

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService) {
        this.activatedRoute.queryParamMap
            .subscribe(params => {
                try {
                    if (!params?.get('token')) {
                        // redirect to forgot password with message token not there
                        this.alertService.showError('Invlaid url\n please enter email again.', ApiCode.ERROR);
                        this.router.navigate(['/forgotpass']);
                    }
                    this.tokenPayload = jwt_decode(params?.get('token'), { header: false });
                    this.tokenPayload = JSON.parse(this.tokenPayload.sub);
                } catch (exception) {
                    this.alertService.showError('Invlaid token\n please enter email again.', ApiCode.ERROR);
                    this.router.navigate(['/forgotpass']);
                }
            });
    }

    ngOnInit() {
        // if the token is not valid show the message and aslo hide redirect to reset password
        this.resetPassForm = this.fb.group({
            uuid: [this.tokenPayload.uuid, Validators.required],
            email: [this.tokenPayload.email, Validators.required],
            username: [this.tokenPayload.username, Validators.required],
            newPassword: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
        });
        this.resetPassForm.controls['username'].disable();
        this.resetPassForm.controls['email'].disable();
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.resetPassForm.controls['confirm'].updateValueAndValidity());
    }

    public confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.resetPassForm.controls['newPassword'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    public onSubmit(): any {
        // stop here if form is invalid
        if (this.resetPassForm.invalid) {
            Object.values(this.resetPassForm.controls)
                .forEach(control => {
                    if (control.invalid) {
                        control.markAsDirty();
                        control.updateValueAndValidity({ onlySelf: true });
                    }
                });
            return;
        }
        let payload = {
            email: this.resetPassForm.controls['email'].value,
            newPassword: this.resetPassForm.controls['newPassword'].value
        };
        this.authenticationService.resetPassword(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.router.navigate(['/login']);
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