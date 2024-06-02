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
    IEventBridge,
    LOOKUP_TYPE,
    LookupService,
    EvenBridgeService
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-event-bridge',
    templateUrl: './cu-event-bridge.component.html',
    styleUrls: ['./cu-event-bridge.component.css']
})
export class CUEventBridgeComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IEventBridge;

    public credentials: ICredential[] = [];

    public APPLICATION_STATUS: ILookups;
    public EVENT_BRIDGE_TYPE: ILookups;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;
    
    public eventBridgeForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        public commomService: CommomService,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private credentailService: CredentailService,
        private evenBridgeService: EvenBridgeService,
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
            lookupType: LOOKUP_TYPE.EVENT_BRIDGE_TYPE
        }).subscribe((data) => {
            this.EVENT_BRIDGE_TYPE = data;
        });
        this.fetchAllCredentialByType();
        if (this.actionType === ActionType.ADD) {
            this.addEventBridgeForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editEventBridgeForm();
        }
    }

    public addEventBridgeForm(): any {
        this.spinnerService.show();
        this.eventBridgeForm = this.fb.group({
            name: ['', Validators.required],
            bridgeUrl: ['', Validators.required],
            bridgeType: ['', Validators.required],
            description: ['', Validators.required],
            credentialId: ['', Validators.required],
        });
        this.spinnerService.hide();
    }

    public editEventBridgeForm(): void {
        this.spinnerService.show();
        this.eventBridgeForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            bridgeUrl: [this.editPayload.bridgeUrl, Validators.required],
            bridgeType: [this.editPayload?.bridgeType?.lookupCode, Validators.required],
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
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.eventBridgeForm.controls;
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addEventBridge();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateEventBridge();
        }
    }

    public addEventBridge(): void {
        this.spinnerService.show();
        if (this.eventBridgeForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.eventBridgeForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.evenBridgeService.addEventBridge(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public updateEventBridge(): void {
        this.spinnerService.show();
        if (this.eventBridgeForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.eventBridgeForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.evenBridgeService.updateEventBridge(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeDrawer();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
