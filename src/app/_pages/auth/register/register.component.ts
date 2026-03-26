import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService
} from '../../../_helpers';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public profileList: string[] = ['a1.png', 'a2.png', 'a3.png', 'a4.png'];
    public registerForm!: UntypedFormGroup;

    constructor(
        private readonly router: Router,
        private readonly fb: UntypedFormBuilder,
        private readonly alertService: AlertService,
        private readonly authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
            profileImg: [this.profileList[Math.floor(Math.random() * this.profileList.length)]]
        });
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
        if (this.registerForm.invalid) {
            Object.values(this.registerForm.controls)
                .forEach(control => {
                    if (control.invalid) {
                        control.markAsDirty();
                        control.updateValueAndValidity({ onlySelf: true });
                    }
                });
            return;
        }
        this.authenticationService.signupAppUser(this.registerForm.getRawValue())
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