import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../_helpers';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import {
    ApiCode,
    AuthenticationService
} from '../../../_shared';
import { first } from 'rxjs/operators';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public passwordVisible: boolean = false;
    public loginForm!: UntypedFormGroup;
    public returnUrl: string;

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['super_admin93', [Validators.required]],
            password: ['B@llistic1', [Validators.required]]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public onSubmit(): any {
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls)
            .forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }
        this.authenticationService.signInAppUser(this.loginForm.value).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.router.navigate([this.returnUrl]);
                }
            ));
    }

    public register(): any {
        this.router.navigate(['/register']);
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}