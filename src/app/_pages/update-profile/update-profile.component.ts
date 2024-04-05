import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    ApiCode,
    AppUserService,
    AuthResponse,
    AuthenticationService,
    IAppUser,
    ICompany,
    IProfileSetting
} from '../../_shared';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService,
    CommomService,
    StorageService
} from 'src/app/_helpers';
import { Observable, Observer, first } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';


@Component({
    selector: 'update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

    public updateProfileForm: FormGroup;
    public updateCompnayForm: FormGroup;
    public resetPasswordForm: FormGroup;
    public currentUser: AuthResponse;
    public appUser: IAppUser;

    public fileList: NzUploadFile[] = [];

    public USER_INFO: IProfileSetting = IProfileSetting.USER_INFO;
    public COMPANY_INFO: IProfileSetting = IProfileSetting.COMPANY_INFO;
    public CHANGE_PASSWORD: IProfileSetting = IProfileSetting.CHANGE_PASSWORD;
    public MY_TEAM: IProfileSetting = IProfileSetting.MY_TEAM;
    public ENVIROMENT: IProfileSetting = IProfileSetting.ENVIROMENT;

    public viewProfile: IProfileSetting = IProfileSetting.USER_INFO;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private appUserService: AppUserService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService,
        public storageService: StorageService,
        private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.fetchAppUserProfile(this.currentUser.username);
    }

    ngOnInit() {
    }

    public fetchAppUserProfile(payload: any): void {
        this.spinnerService.show();
        this.appUserService.fetchAppUserProfile(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response?.message, ApiCode.ERROR);
                    return;
                }
                this.appUser = response.data;
                this.fillAppUserProfileDetail(this.appUser);
                this.fillAppUserCompanyDetail(this.appUser?.company);
                this.fillAppUserPasswordDetail(this.appUser);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public fillAppUserProfileDetail(payload: IAppUser): void {
        this.updateProfileForm = this.fb.group({
            id: [payload.id],
            ipAddress: [payload?.ipAddress, [Validators.required]],
            firstName: [payload?.firstName, [Validators.required]],
            lastName: [payload?.lastName, [Validators.required]],
            username: [payload.username, [Validators.required]],
            email: [payload.email, [Validators.email, Validators.required]]
        });
        this.updateProfileForm.controls['username'].disable();
        this.updateProfileForm.controls['email'].disable();
    }

    public fillAppUserCompanyDetail(payload: ICompany): void {
        this.updateCompnayForm = this.fb.group({
            id: [payload.id],
            name: [payload?.name, [Validators.required]],
            email: [payload?.email, [Validators.required]],
            address: [payload?.address, [Validators.required]],
            phone: [payload.phone, [Validators.required]]
        });
    }

    public fillAppUserPasswordDetail(payload: IAppUser): void {
        this.resetPasswordForm = this.fb.group({
            id: [payload.id],
            email: [payload.email, [Validators.email, Validators.required]],
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
        });
        this.resetPasswordForm.controls['email'].disable();
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.resetPasswordForm.controls['confirm'].updateValueAndValidity());
    }

    public confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.resetPasswordForm.controls['newPassword'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    public submitUpdateAppUserProfile(): any {
        this.spinnerService.show();
        if (this.updateProfileForm.invalid) {
          this.spinnerService.hide();
          return;
        }
        // this.appUserService.updateAppUserProfile(this.updateProfileForm.getRawValue())
        //   .pipe(first())
        //   .subscribe((response: any) => {
        //     this.spinnerService.hide();
        //     if (response.status === ApiCode.ERROR) {
        //       this.alertService.showError(response?.message, ApiCode.ERROR);
        //       return;
        //     }
        //     this.currentUser.appUserName = response.data.appUserName;
        //     this.storageService.set('currentUser', this.currentUser);
        //     this.alertService.showSuccess(response?.message, ApiCode.SUCCESS);
        //   }, (error: any) => {
        //     this.spinnerService.hide();
        //     this.alertService.showError(error, ApiCode.ERROR);
        //   });
      }
    

    public onNaviage(profile: IProfileSetting) {
        this.viewProfile = profile;
    }

}