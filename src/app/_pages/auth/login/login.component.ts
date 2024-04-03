import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertService, SpinnerService } from '../../../_helpers';
import { ApiCode, AuthenticationService } from '../../../_shared';
import { first } from 'rxjs/operators';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public passwordVisible: boolean = false;
    public loginForm!: UntypedFormGroup;
    public loading: any = false;
    public returnUrl: string;

    constructor(
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spinnerService: SpinnerService) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.spinnerService.hide()
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    public onSubmit(): any {
        this.spinnerService.show();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            this.spinnerService.hide();
            return;
        }
        this.loading = true;
        this.authenticationService.signInAppUser(this.loginForm.value)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.router.navigate([this.returnUrl]);
            }, (error: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public register(): any {
        this.router.navigate(['/register']);
    }

}