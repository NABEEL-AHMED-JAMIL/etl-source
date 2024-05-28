import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    CommomService,
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    APPLICATION_STATUS,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    CREDENTIAL_TYPE,
    CredentailService,
    ICredential,
    ILookups,
    IWebHook,
    LOOKUP_TYPE,
    LookupService,
    WebHookService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-webhook',
    templateUrl: './cu-webhook.component.html',
    styleUrls: ['./cu-webhook.component.css']
})
export class CUWebHookComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IWebHook;

    public credentials: ICredential[] = [];

    public APPLICATION_STATUS: ILookups;
    public HOOK_TYPE: ILookups;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;
    
    public webHookForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        public commomService: CommomService,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private credentailService: CredentailService,
        private webHookService: WebHookService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.HOOK_TYPE
        }).subscribe((data) => {
            this.HOOK_TYPE = data;
        });
        this.fetchAllCredentialByType();
        if (this.actionType === ActionType.ADD) {
            this.addWebHookForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editWebHookForm();
        }
    }

    public addWebHookForm(): any {
        this.spinnerService.show();
        this.webHookForm = this.fb.group({
            name: ['', Validators.required],
            hookUrl: ['', Validators.required],
            hookType: ['', Validators.required],
            description: ['', Validators.required],
            credentialId: ['', Validators.required],
        });
        this.spinnerService.hide();
    }

    public editWebHookForm(): void {
        this.spinnerService.show();
        this.webHookForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            hookUrl: [this.editPayload.hookUrl, Validators.required],
            hookType: [this.editPayload?.hookType?.lookupCode, Validators.required],
            description: [this.editPayload.description, Validators.required],
            credentialId: [this.editPayload.credential ? this.editPayload?.credential.id : '', Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public fetchAllCredentialByType(): any {
        this.spinnerService.show();
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            },
            types: [CREDENTIAL_TYPE.CERTIFICATE]
        }
        this.credentailService.fetchAllCredentialByType(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.credentials = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.webHookForm.controls;
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addWebHook();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateWebHook();
        }
    }

    public addWebHook(): void {
        this.spinnerService.show();
        if (this.webHookForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.webHookForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.webHookService.addWebHook(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public updateWebHook(): void {
        this.spinnerService.show();
        if (this.webHookForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.webHookForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.webHookService.updateWebHook(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
