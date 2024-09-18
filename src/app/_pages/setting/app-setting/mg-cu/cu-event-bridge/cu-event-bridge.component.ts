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
    AlertService
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
    EvenBridgeService,
    REQUEST_METHOD
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
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

    public APPLICATION_STATUS: ILookups;
    public EVENT_BRIDGE_TYPE: ILookups;
    public REQUEST_METHOD: ILookups;
    public credentials: ICredential[] = [];

    public sessionUser: AuthResponse;
    public editAction = ActionType.EDIT;    
    public eventBridgeForm: FormGroup;

    constructor(private fb: FormBuilder,
        public commomService: CommomService,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        private credentailService: CredentailService,
        private evenBridgeService: EvenBridgeService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
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
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.REQUEST_METHOD
        }).subscribe((data) => {
            this.REQUEST_METHOD = data;
        });
        this.fetchAllCredentialByType();
        if (this.actionType === ActionType.ADD) {
            this.addEventBridgeForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editEventBridgeForm();
        }
    }

    public addEventBridgeForm(): any {
        this.eventBridgeForm = this.fb.group({
            name: ['', Validators.required],
            bridgeUrl: ['', Validators.required],
            httpMethod: [REQUEST_METHOD.POST, [Validators.required]],
            bridgeType: ['', Validators.required],
            description: ['', Validators.required],
            credentialId: ['', Validators.required],
        });
    }

    public editEventBridgeForm(): void {
        this.eventBridgeForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            bridgeUrl: [this.editPayload.bridgeUrl, Validators.required],
            httpMethod: [this.editPayload.httpMethod.lookupCode, [Validators.required]],
            bridgeType: [this.editPayload?.bridgeType?.lookupCode, Validators.required],
            description: [this.editPayload.description, Validators.required],
            credentialId: [this.editPayload.credential ? this.editPayload?.credential.id : '', Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.eventBridgeForm.get('bridgeType').disable();
    }

    public fetchAllCredentialByType(): any {
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            },
            types: [CREDENTIAL_TYPE.CERTIFICATE]
        }
        this.credentailService.fetchAllCredentialByType(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.credentials = response.data;
                }
            ));
    }

    public onSubmit(): void {
        if (this.eventBridgeForm.invalid) {
            return;
        }
        let payload = {
            ...this.eventBridgeForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        if (this.actionType === ActionType.ADD) {
            this.addEventBridge(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateEventBridge(payload);
        }
    }

    public addEventBridge(payload: any): void {
        this.evenBridgeService.addEventBridge(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    public updateEventBridge(payload: any): void {
        this.evenBridgeService.updateEventBridge(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
