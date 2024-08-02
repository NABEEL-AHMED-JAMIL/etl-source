import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService
} from '../../../_helpers';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared/index';
import { first } from 'rxjs/operators';


@Component({
    selector: 'forgot-pass',
    templateUrl: './forgot-pass.component.html',
    styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

    public forgotForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.hide()
        this.forgotForm = this.fb.group({
            email: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.forgotForm.controls;
    }

    public onSubmit(): any {
        this.spinnerService.show();
        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            Object.values(this.forgotForm.controls)
            .forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            this.spinnerService.hide();
            return;
        }
        this.authenticationService.forgotPassword(this.forgotForm.value)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.router.navigate(['/login']);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}