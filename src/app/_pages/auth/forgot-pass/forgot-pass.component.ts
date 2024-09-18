import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { AlertService } from '../../../_helpers';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared/index';
import { first } from 'rxjs/operators';

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
        this.authenticationService.forgotPassword(this.forgotForm.value).pipe(first())
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