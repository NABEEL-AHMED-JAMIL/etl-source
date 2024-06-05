import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
    AlertService,
    SpinnerService
} from '../../../_helpers';
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


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public profileList: string[] = ['a1.png', 'a2.png', 'a3.png', 'a4.png'];
    public loading: any = false;
    public submitted: any = false;

    public registerForm!: UntypedFormGroup;

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private authenticationService: AuthenticationService,
        private spinnerService: SpinnerService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
            profileImg: [this.profileList[Math.floor(
                Math.random() * this.profileList.length)]]
        });
    }

    public resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.registerForm.reset();
        for (const key in this.registerForm.controls) {
            if (this.registerForm.controls.hasOwnProperty(key)) {
                this.registerForm.controls[key].markAsPristine();
                this.registerForm.controls[key].updateValueAndValidity();
            }
        }
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.registerForm.controls['confirm'].updateValueAndValidity());
    }

    public confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.registerForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    public onSubmit(): any {
        this.spinnerService.show();
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            Object.values(this.registerForm.controls)
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
        this.authenticationService.signupAppUser(this.registerForm.getRawValue())
            .pipe(first())
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