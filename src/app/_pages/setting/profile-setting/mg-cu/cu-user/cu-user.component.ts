import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    UntypedFormControl,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AppUserService,
    AuthResponse,
    AuthenticationService,
    IAppUser,
    ILookups,
    IProfile,
    IRole,
    LOOKUP_TYPE,
    LookupService,
    RPPService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-user',
    templateUrl: './cu-user.component.html',
    styleUrls: ['./cu-user.component.css']
})
export class CUUserComponent implements OnInit {

    private IP_PATTERN = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
    public profileList: string[] = ['a1.png', 'a2.png', 'a3.png', 'a4.png'];

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IAppUser;

    public roleList: IRole[] = [];
    public profiles: IProfile[] = [];

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public ACCOUNT_TYPE: ILookups;
    public userForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private appUserService: AppUserService,
        public commomService: CommomService,
        public rppService: RPPService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.ACCOUNT_TYPE
        }).subscribe((data) => {
            this.ACCOUNT_TYPE = data;
        });
        // role
        this.fetchRoleWithUser({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        // profile
        this.fetchProfileWithUser({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        if (this.actionType === ActionType.ADD) {
            this.addUserForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editUserForm();
        }
    }

    public fetchProfileWithUser(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchProfileWithUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.profiles = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.closeDrawer();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchRoleWithUser(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchRoleWithUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.roleList = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.closeDrawer();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public addUserForm(): any {
        this.spinnerService.show();
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            ipAddress: ['', [Validators.required, Validators.pattern(this.IP_PATTERN)]],
            password: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
            assignRole: [, [Validators.required]],
            accountType: ['', [Validators.required]],
            profile: ['', [Validators.required]],
            profileImg: [this.profileList[Math.floor(
                Math.random() * this.profileList.length)]]
        });
        this.spinnerService.hide();
    }

    public editUserForm(): void {
        this.spinnerService.show();
        this.userForm = this.fb.group({
            id: [this.editPayload.id, [Validators.required]],
            firstName: [this.editPayload.firstName, [Validators.required]],
            lastName: [this.editPayload.lastName, [Validators.required]],
            username: [this.editPayload.username, [Validators.required]],
            email: [this.editPayload.email, [Validators.email, Validators.required]],
            ipAddress: [this.editPayload.ipAddress, [Validators.required]],
            assignRole: [this.editPayload.roles, [Validators.required]],
            profile: [this.editPayload.profile?.id, [Validators.required]],
            accountType: [this.editPayload.accountType?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addAppUserAccount();
        } else if (this.actionType === ActionType.EDIT) {
            this.editAppUserAccount();
        }
    }

    public addAppUserAccount(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.userForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.userForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.appUserService.addAppUserAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public editAppUserAccount(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.userForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.userForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.appUserService.editAppUserAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.userForm.controls['confirm'].updateValueAndValidity());
    }

    public confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.userForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    // convenience getter for easy access to form fields
    get user() {
        return this.userForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
