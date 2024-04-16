import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    CREDENTIAL_TYPE,
    CredentailService,
    ICredential,
    ILookups,
    LOOKUP_TYPE,
    LookupService
} from 'src/app/_shared';


@Component({
    selector: 'cu-credential',
    templateUrl: 'cu-credential.component.html',
    styleUrls: ['cu-credential.component.css']
})
export class CuCredentialComponent implements OnInit {

    public passwordVisible: boolean = false;

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ICredential;

    public editAction = ActionType.EDIT;

    public BASIC_AUTH = CREDENTIAL_TYPE.BASIC_AUTH;
    public CERTIFICATE = CREDENTIAL_TYPE.CERTIFICATE;
    public AUTHORIZATION_CODE = CREDENTIAL_TYPE.AUTHORIZATION_CODE;
    public AWS_AUTH = CREDENTIAL_TYPE.AWS_AUTH;
    public FIREBASE = CREDENTIAL_TYPE.FIREBASE;
    public FTP = CREDENTIAL_TYPE.FTP;

    public loading: boolean = false;
    public credentialForm: FormGroup;

    public CREDENTIAL_TYPE: ILookups;
    public APPLICATION_STATUS: ILookups;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private credentailService: CredentailService,
        private drawerRef: NzDrawerRef<void>,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit() {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.CREDENTIAL_TYPE
        }).subscribe((data) => {
            this.CREDENTIAL_TYPE = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupType !== 'DELETE');
        });
        if (this.actionType === ActionType.ADD) {
            this.credentialForm = this.fb.group({
                name: ['', Validators.required],
                type: ['', Validators.required]
            });
        } else if (this.actionType === ActionType.EDIT) {
            this.fetchCredentialById(this.editPayload);
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.credentialForm.controls;
    }

    get cred() {
        return this.credentialForm.get('content');
    }

    public onCredentailTypeSelected(event: any): void {
        if (event === CREDENTIAL_TYPE.BASIC_AUTH) {
            // BASIC_AUTH
            this.credentialForm.removeControl('content');
            this.addBasicAuth();
            return;
        } else if (event === CREDENTIAL_TYPE.CERTIFICATE) {
            // CERTIFICATE
            this.credentialForm.removeControl('content');
            this.addCertificate();
            return;
        } else if (event === CREDENTIAL_TYPE.AUTHORIZATION_CODE) {
            // AUTHORIZATION_CODE
            this.credentialForm.removeControl('content');
            this.addAuthorizationCode();
            return;
        } else if (event === CREDENTIAL_TYPE.AWS_AUTH) {
            // AWS_AUTH
            this.credentialForm.removeControl('content');
            this.addAwsAuth();
            return;
        } else if (event === CREDENTIAL_TYPE.FIREBASE) {
            // FIREBASE
            this.credentialForm.removeControl('content');
            this.addFirebase();
            return;
        } else if (event === CREDENTIAL_TYPE.FTP) {
            // FTP
            this.credentialForm.removeControl('content');
            this.addFtp();
            return;
        }
    }

    // BASIC_AUTH
    public addBasicAuth(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                username: ['', [Validators.required]],
                password: ['', [Validators.required]]
            }));
    }

    public editBasicAuth(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                username: [payload.username, [Validators.required]],
                password: [payload.password, [Validators.required]]
            }));
    }

    // CERTIFICATE
    public addCertificate(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                certificate: ['', [Validators.required]],
                certKey: ['', [Validators.required]],
                certKeyPassword: ['', [Validators.required]]
            }));
    }

    public editCertificate(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                certificate: [payload?.certificate, [Validators.required]],
                certKey: [payload?.certKey, [Validators.required]],
                certKeyPassword: [payload?.certKeyPassword, [Validators.required]]
            }));
    }

    // AUTHORIZATION_CODE
    public addAuthorizationCode(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                clientId: ['', [Validators.required]],
                clientSecret: ['', [Validators.required]],
                authenticationUrl: ['', [Validators.required]],
                tokenUrl: ['', [Validators.required]],
                scope: ['', [Validators.required]]
            }));
    }

    public editAuthorizationCode(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                clientId: [payload?.clientId, [Validators.required]],
                clientSecret: [payload?.clientSecret, [Validators.required]],
                authenticationUrl: [payload?.authenticationUrl, [Validators.required]],
                tokenUrl: [payload?.tokenUrl, [Validators.required]],
                scope: [payload?.scope, [Validators.required]]
            }));
    }

    // AWS_AUTH
    public addAwsAuth(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                clientId: ['', [Validators.required]],
                clientSecret: ['', [Validators.required]],
                region: [''],
                bucket: [''],
                other: ['']
            }));
    }

    public editAwsAuth(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                region: [payload?.region, [Validators.required]],
                clientId: [payload?.clientId, [Validators.required]],
                clientSecret: [payload?.clientSecret, [Validators.required]],
                bucket: [payload?.bucket],
                other: [payload?.other]
            }));
    }

    // FIREBASE
    public addFirebase(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                firePayload: ['', [Validators.required]]
            }));
    }

    public editFirebase(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                firePayload: [payload?.firePayload, [Validators.required]]
            }));
    }

    // FTP
    public addFtp(): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                host: ['', [Validators.required]], // IP
                port: ['', [Validators.required]], // PORT
                user: ['', [Validators.required]], // USER
                password: ['', [Validators.required]], // PASS
                directoryPath: ['']
            }));
    }

    public editFtp(payload: any): void {
        this.credentialForm.addControl('content',
            this.fb.group({
                host: [payload?.host, [Validators.required]], // IP
                port: [payload?.port, [Validators.required]], // PORT
                user: [payload?.user, [Validators.required]], // USER
                password: [payload?.password, [Validators.required]], // PASS
                directoryPath: [payload?.directoryPath]
            }));
    }

    public fetchCredentialById(data: any): void {
        this.spinnerService.show();
        let payload = {
            id: data.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.credentailService.fetchCredentialById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                response = response.data;
                this.credentialForm = this.fb.group({
                    id: [response?.id, Validators.required],
                    name: [response?.name, Validators.required],
                    type: [response?.type?.lookupCode, Validators.required],
                    status: [response?.status?.lookupCode, [Validators.required]],
                });
                if (response?.type?.lookupCode === CREDENTIAL_TYPE.BASIC_AUTH) {
                    this.editBasicAuth(response?.content);
                } else if (response?.type?.lookupCode === CREDENTIAL_TYPE.CERTIFICATE) {
                    this.editCertificate(response?.content);
                } else if (response?.type?.lookupCode === CREDENTIAL_TYPE.AUTHORIZATION_CODE) {
                    this.editAuthorizationCode(response?.content);
                } else if (response?.type?.lookupCode === CREDENTIAL_TYPE.AWS_AUTH) {
                    this.editAwsAuth(response?.content);
                } else if (response?.type?.lookupCode === CREDENTIAL_TYPE.FIREBASE) {
                    this.editFirebase(response?.content);
                } else if (response?.type?.lookupCode === CREDENTIAL_TYPE.FTP) {
                    this.editFtp(response?.content);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addCredential();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateCredential();
        }
    }

    public addCredential(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.credentialForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.credentialForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.credentailService.addCredential(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (error: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public updateCredential(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.credentialForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.credentialForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.credentailService.updateCredential(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (error: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}