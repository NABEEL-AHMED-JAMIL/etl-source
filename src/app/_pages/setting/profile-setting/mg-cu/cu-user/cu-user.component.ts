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
    CommomService
} from 'src/app/_helpers';
import {
    APP_ADMIN,
    APP_PROFILE,
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

/**
 * @author Nabeel Ahmed
 */
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

    public editAction = ActionType.EDIT;
    public ACCOUNT_TYPE: ILookups;
    public userForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        private appUserService: AppUserService,
        public commomService: CommomService,
        public rppService: RPPService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.ACCOUNT_TYPE
        }).subscribe((data) => {
            this.ACCOUNT_TYPE = data;
        });
        // role
        this.fetchRoleWithUser({});
        // profile
        this.fetchProfileWithUser({});
        if (this.actionType === ActionType.ADD) {
            this.addUserForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editUserForm();
        }
    }

    public addUserForm(): any {
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
    }

    public editUserForm(): void {
        this.userForm = this.fb.group({
            uuid: [this.editPayload.uuid, [Validators.required]],
            firstName: [this.editPayload.firstName, [Validators.required]],
            lastName: [this.editPayload.lastName, [Validators.required]],
            username: [this.editPayload.username, [Validators.required]],
            email: [this.editPayload.email, [Validators.email, Validators.required]],
            ipAddress: [this.editPayload.ipAddress, [Validators.required]],
            assignRole: [this.editPayload.roles, [Validators.required]],
            profile: [this.editPayload.profile?.profileName, [Validators.required]],
            accountType: [this.editPayload.accountType?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.userForm.invalid) {
            return;
        }
        let payload = {
            ...this.userForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addAppUserAccount(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateAppUserAccount(payload);
        }
    }

    public fetchProfileWithUser(payload: any): any {
        this.rppService.fetchProfileWithUser(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.profiles = response.data;
                })
            );
    }

    public fetchRoleWithUser(payload: any): any {
        this.rppService.fetchRoleWithUser(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.roleList = response.data;
                })
            );
    }

    public addAppUserAccount(payload: any): void {
        this.appUserService.addAppUserAccount(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                })
            );
    }

    public updateAppUserAccount(payload: any): void {
        this.appUserService.updateAppUserAccount(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                })
            );
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

    public onProfileRoleSelect(profileName: any): void {
        if (profileName === APP_PROFILE.SUPER_ADMIN_PROFILE) {
            this.userForm.controls['assignRole'].setValue([APP_ADMIN.ROLE_MASTER_ADMIN]);
        } else if (profileName === APP_PROFILE.ADMIN_PROFILE) {
            this.userForm.controls['assignRole'].setValue([APP_ADMIN.ROLE_ADMIN]);
        } else if (profileName === APP_PROFILE.USER_PROFILE) {
            this.userForm.controls['assignRole'].setValue([APP_ADMIN.ROLE_USER]);
        } else if (profileName === APP_PROFILE.DB_PROFILE) {
            this.userForm.controls['assignRole'].setValue([APP_ADMIN.ROLE_DB]);
        }
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
