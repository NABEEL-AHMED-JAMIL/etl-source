import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, SpinnerService } from '../../../_helpers';
import { ApiCode, AuthenticationService } from '../../../_shared';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import jwt_decode from "jwt-decode";


@Component({
    selector: 'reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

    public resetPassForm: UntypedFormGroup;
    public loading: any = false;
    public submitted: any = false;
    public tokenPayload: any;

    constructor(private router: Router,
        private _activatedRoute: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spinnerService: SpinnerService) {
        this._activatedRoute.queryParamMap
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
        this.spinnerService.hide()
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
        this.spinnerService.show();
        this.submitted = true;
        // stop here if form is invalid
        if (this.resetPassForm.invalid) {
            Object.values(this.resetPassForm.controls)
                .forEach(control => {
                    if (control.invalid) {
                        control.markAsDirty();
                        control.updateValueAndValidity({ onlySelf: true });
                    }
                });
            this.spinnerService.hide();
            return;
        }
        this.loading = true;
        let payload = {
            sessionUser: {
                id: this.resetPassForm.controls['id'].value,
                email: this.resetPassForm.controls['email'].value,
                username: this.resetPassForm.controls['username'].value
            },
            newPassword: this.resetPassForm.controls['newPassword'].value
        };
        this.authenticationService.resetPassword(payload).pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.submitted = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.router.navigate(['/login']);
            }, (response: any) => {
                this.loading = false;
                this.submitted = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}