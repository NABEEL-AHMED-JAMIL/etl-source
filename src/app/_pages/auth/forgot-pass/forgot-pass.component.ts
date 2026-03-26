import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService
} from '../../../_helpers';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared/index';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'forgot-pass',
    templateUrl: './forgot-pass.component.html',
    styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

    public forgotForm!: UntypedFormGroup;

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.forgotForm = this.fb.group({
            email: ['', Validators.required],
        });
    }

    public onSubmit(): any {
        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            Object.values(this.forgotForm.controls)
            .forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }
        this.authenticationService.forgotPassword(this.forgotForm.value)
            .pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(ApiCode.SUCCESS, response.message);
                    this.router.navigate(['auth/login']);
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(ApiCode.ERROR, response.message);
            return;
        }
        successCallback();
    }

}