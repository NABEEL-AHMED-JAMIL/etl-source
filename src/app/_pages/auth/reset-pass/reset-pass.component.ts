import { Component, OnInit } from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import { first } from 'rxjs/operators';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import jwt_decode from "jwt-decode";
import {
    AlertService
} from '../../../_helpers';
import {
    ApiCode,
    TokenPayload,
    ResetPayload,
    AuthenticationService
} from '../../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

    public tokenPayload: TokenPayload;
    public resetPassForm: UntypedFormGroup;

    constructor(
        private readonly router: Router,
        private readonly fb: UntypedFormBuilder,
        private readonly alertService: AlertService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authenticationService: AuthenticationService) {
        this.activatedRoute.queryParamMap
            .pipe(first())
            .subscribe(params => this.initFromQueryParams(params));
    }

    private initFromQueryParams(params: any): void {
        const token = params?.get('token');
        if (!token) {
            this.alertService.showError(ApiCode.ERROR, 'Invalid URL: please enter email again.');
            this.router.navigate(['forgotpass']);
            return;
        }
        try {
            const decoded: any = jwt_decode(token, { header: false });
            const sub = decoded?.sub ? JSON.parse(decoded.sub) : null;
            if (!sub || !sub.uuid || !sub.email || !sub.username) {
                throw new Error('invalid token payload');
            }
            this.tokenPayload = {
                uuid: sub.uuid,
                email: sub.email,
                username: sub.username
            };
        } catch {
            this.alertService.showError(ApiCode.ERROR, 'Invalid token: please enter email again.');
            this.router.navigate(['forgotpass']);
        }
    }

    ngOnInit() {
        if (!this.tokenPayload) {
            return;
        }
        this.resetPassForm = this.fb.group({
            uuid: [this.tokenPayload.uuid, Validators.required],
            email: [this.tokenPayload.email, Validators.required],
            username: [this.tokenPayload.username, Validators.required],
            newPassword: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]]
        });
        this.resetPassForm.controls['username'].disable();
        this.resetPassForm.controls['email'].disable();
    }

    private get email() {
        return this.resetPassForm.controls['email'];
    }

    private get username() {
        return this.resetPassForm.controls['username'];
    }

    private get newPassword() {
        return this.resetPassForm.controls['newPassword'];
    }

    private get confirm() {
        return this.resetPassForm.controls['confirm'];
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.confirm.updateValueAndValidity());
    }

    public confirmValidator = (control: UntypedFormControl): { [key: string]: any } | null => {
        if (!control.value) {
            return { required: true };
        }
        if (!this.resetPassForm) {
            return null;
        }
        if (control.value !== this.newPassword.value) {
            return { confirm: true };
        }
        return null;
    };

    public onSubmit(): void {
        if (!this.resetPassForm) {
            return;
        }
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
        const payload: ResetPayload = {
            email: this.email.value,
            newPassword: this.newPassword.value
        };
        this.authenticationService.resetPassword(payload)
            .pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(ApiCode.SUCCESS, response.message);
                    this.router.navigate(['auth/login']);
                })
            );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(ApiCode.ERROR, response.message);
            return;
        }
        successCallback();
    }

}