import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCode, ActionType, ICredential, CredentailService, ILookupData, LOOKUP_TYPE, CREDENTIAL_TYPE } from '../../../../../_shared';
import { AlertService, SpinnerService, StorageService } from '../../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-cu-credential',
  templateUrl: './cu-credential.component.html',
  styleUrls: ['./cu-credential.component.css']
})
export class CUCredentialComponent implements OnInit {

  @Input()
  public actionType: ActionType;
  @Input()
  public editPayload: ICredential;

  private formControlName: any = 'credentialContent';

  public loading: any = false;
  public credentailForm: FormGroup;

  public credentailTypeLookup: ILookupData;
  public applicationStatusLookup: ILookupData;

  public CREDENTIAL_TYPE = LOOKUP_TYPE.CREDENTIAL_TYPE;
  public APPLICATION_STATUS = LOOKUP_TYPE.APPLICATION_STATUS;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private credentailService: CredentailService,
    private spinnerService: SpinnerService,
    private storageService: StorageService) {
  }

  ngOnInit(): any {
    this.credentailTypeLookup = this.storageService.findLookupByParent(this.CREDENTIAL_TYPE);
    this.applicationStatusLookup = this.storageService.findLookupByParent(this.APPLICATION_STATUS);
    if (this.actionType === ActionType.ADD) {
      this.credentailForm = this.formBuilder.group({
        credentialName: ['', Validators.required],
        credentialType: ['', Validators.required],
        status: [1, [Validators.required]],
      });
      this.credentailForm.controls['status'].disable();
    } else if (this.actionType === ActionType.EDIT) {
      this.fetchCredentialByCredentialId(this.editPayload.credentialId);
    }
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.credentailForm.controls;
  }

  get cred() {
    return this.credentailForm.get(this.formControlName);
  }

  public onCredentailTypeSelected(event: any): void {
    if (event === CREDENTIAL_TYPE.BASIC_AUTH) {
      // BASIC_AUTH
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addBasicAuth();
      return;
    } else if (event === CREDENTIAL_TYPE.CERTIFICATE) {
      // CERTIFICATE
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addCertificate();
      return;
    } else if (event === CREDENTIAL_TYPE.AUTHORIZATION_CODE) {
      // AUTHORIZATION_CODE
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addAuthorizationCode();
      return;
    } else if (event === CREDENTIAL_TYPE.AWS_AUTH) {
      // AWS_AUTH
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addAwsAuth();
      return;
    } else if (event === CREDENTIAL_TYPE.FIREBASE) {
      // FIREBASE
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addFirebase();
      return;
    } else if (event === CREDENTIAL_TYPE.FTP) {
      // FTP
      this.loading = false;
      this.credentailForm.removeControl(this.formControlName);
      this.addFtp();
      return;
    }
  }

  // BASIC_AUTH
  public addBasicAuth(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }));
  }

  public editBasicAuth(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        username: [payload.username, [Validators.required]],
        password: [payload.password, [Validators.required]]
      }));
  }

  // CERTIFICATE
  public addCertificate(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        certificate: ['', [Validators.required]],
        certKey: ['', [Validators.required]],
        certKeyPassword: ['', [Validators.required]]
      }));
  }

  public editCertificate(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        certificate: [payload?.certificate, [Validators.required]],
        certKey: [payload?.certKey, [Validators.required]],
        certKeyPassword: [payload?.certKeyPassword, [Validators.required]]
      }));
  }

  // AUTHORIZATION_CODE
  public addAuthorizationCode(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        clientId: ['', [Validators.required]],
        clientSecret: ['', [Validators.required]],
        authenticationUrl: ['', [Validators.required]],
        tokenUrl: ['', [Validators.required]],
        scope: ['', [Validators.required]]
      }));
  }

  public editAuthorizationCode(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        clientId: [payload?.clientId, [Validators.required]],
        clientSecret: [payload?.clientSecret, [Validators.required]],
        authenticationUrl: [payload?.authenticationUrl, [Validators.required]],
        tokenUrl: [payload?.tokenUrl, [Validators.required]],
        scope: [payload?.scope, [Validators.required]]
      }));
  }

  // AWS_AUTH
  public addAwsAuth(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        clientId: ['', [Validators.required]],
        clientSecret: ['', [Validators.required]],
        region: [''],
        bucket: [''],
        other: ['']
      }));
  }

  public editAwsAuth(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        region: [payload?.region, [Validators.required]],
        clientId: [payload?.clientId, [Validators.required]],
        clientSecret: [payload?.clientSecret, [Validators.required]],
        bucket: [payload?.bucket],
        other: [payload?.other]
      }));
  }

  // FIREBASE
  public addFirebase(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        firePayload: ['', [Validators.required]]
      }));
  }

  public editFirebase(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        firePayload: [payload?.firePayload, [Validators.required]]
      }));
  }

  // FTP
  public addFtp(): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        host: ['', [Validators.required]], // IP
        port: ['', [Validators.required]], // PORT
        user: ['', [Validators.required]], // USER
        password: ['', [Validators.required]], // PASS
        directoryPath: ['']
      }));
  }

  public editFtp(payload: any): void {
    this.credentailForm.addControl(this.formControlName,
      this.formBuilder.group({
        host: [payload?.host, [Validators.required]], // IP
        port: [payload?.port, [Validators.required]], // PORT
        user: [payload?.user, [Validators.required]], // USER
        password: [payload?.password, [Validators.required]], // PASS
        directoryPath: [payload?.directoryPath]
      }));
  }

  public fetchCredentialByCredentialId(editCredentialId: any): void {
    this.spinnerService.show();
    let payload = {
      credentialId: editCredentialId,
    }
    this.credentailService.fetchCredentialByCredentialId(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        response = response.data;
        this.credentailForm = this.formBuilder.group({
          credentialId: [response?.credentialId, Validators.required],
          credentialName: [response?.credentialName, Validators.required],
          credentialType: [response?.credentialType?.lookupCode, Validators.required],
          status: [response?.status?.lookupCode, [Validators.required]],
        });
        if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.BASIC_AUTH) {
          this.editBasicAuth(response?.credentialContent);
        } else if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.CERTIFICATE) {
          this.editCertificate(response?.credentialContent);
        } else if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.AUTHORIZATION_CODE) {
          this.editAuthorizationCode(response?.credentialContent);
        } else if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.AWS_AUTH) {
          this.editAwsAuth(response?.credentialContent);
        } else if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.FIREBASE) {
          this.editFirebase(response?.credentialContent);
        } else if (response?.credentialType?.lookupCode === CREDENTIAL_TYPE.FTP) {
          this.editFtp(response?.credentialContent);
        }
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error.message, ApiCode.ERROR);
      });
  }

  public submit(): any {
    this.spinnerService.show();
    this.loading = true;
    // stop here if form is invalid
    if (this.credentailForm.invalid) {
      this.spinnerService.hide();
      return;
    }
    this.loading = true;
    let payload = {
      ...this.credentailForm.getRawValue()
    }
    if (this.actionType === ActionType.ADD) {
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
        }, (error: any) => {
          this.loading = false;
          this.spinnerService.hide();
          this.alertService.showError(error.message, ApiCode.ERROR);
        });
    } else if (this.actionType === ActionType.EDIT) {
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
        }, (error: any) => {
          this.loading = false;
          this.spinnerService.hide();
          this.alertService.showError(error.message, ApiCode.ERROR);
        });
    }
  }

}
