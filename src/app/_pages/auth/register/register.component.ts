import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl,
    UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, SpinnerService, StorageService } from '../../../_helpers';
import { ActionType, ApiCode, AppUserService,
    DELETE, IAppUser, ILookupData, LOOKUP_TYPE, ROLE } from '../../../_shared';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
	public editPayload: IAppUser;
    @Input()
    public roleType: ROLE[];

    public profileList: string[] = ['a1.png', 'a2.png', 'a3.png', 'a4.png'];
    public APPLICATION_STATUS = LOOKUP_TYPE.APPLICATION_STATUS;
    public applicationStatusLookup: ILookupData;
    
    public loading: any = false;
    public submitted: any = false;

    public registerForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder,
        private appUserService: AppUserService,
        private spinnerService: SpinnerService,
        private alertService: AlertService,
        private storageService: StorageService) {
    }

    ngOnInit() {
        if (this.actionType == ActionType.ADD) {
            this.registerForm = this.fb.group({
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                username: ['', [Validators.required]],
                roles: [this.roleType],
                email: ['', [Validators.email, Validators.required]],
                password: ['', [Validators.required]],
                confirm: ['', [this.confirmValidator]],
                profileImg: [this.profileList[Math.floor(
                    Math.random() * this.profileList.length)]]
            });
        } else if (this.actionType == ActionType.EDIT) {
            this.applicationStatusLookup = this.storageService.findLookupByParent(this.APPLICATION_STATUS);
            this.applicationStatusLookup.lookupChildren = this.applicationStatusLookup.lookupChildren
            .filter((data: ILookupData) => data.lookupType != DELETE);
            this.registerForm = this.fb.group({
                firstName: [this.editPayload.firstName, [Validators.required]],
                lastName: [this.editPayload.lastName, [Validators.required]],
                username: [this.editPayload.username, [Validators.required]],
                email: [this.editPayload.email, [Validators.email, Validators.required]],
                status: [this.editPayload.status?.lookupCode, [Validators.required]],
                profileImg: [this.profileList[Math.floor(
                    Math.random() * this.profileList.length)]]
            });
            this.registerForm.controls['username'].disable();
            this.registerForm.controls['email'].disable();
        }
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
        if (this.actionType === ActionType.ADD) {
            this.appUserService.signupAppUser(this.registerForm.getRawValue())
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
            }, (error: any) => {
                this.loading = false;
                this.submitted = false;
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
        } else {
            this.appUserService.updateAppUserProfile(this.registerForm.getRawValue())
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
            }, (error: any) => {
                this.loading = false;
                this.submitted = false;
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
        }

    }

}