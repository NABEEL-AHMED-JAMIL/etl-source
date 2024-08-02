import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    CommomService,
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
    SourceTaskTypeService,
    ICredential,
    ILookups,
    ISTT,
    LOOKUP_TYPE,
    LookupService,
    REQUEST_METHOD,
    TASK_TYPE
} from 'src/app/_shared';


@Component({
    selector: 'cu-source-ttype',
    templateUrl: 'cu-source-ttype.component.html',
    styleUrls: ['cu-source-ttype.component.css']
})
export class CuSourceTTypeComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISTT;

    public editAction = ActionType.EDIT;
    public API = TASK_TYPE.API;
    public AWS_SQS = TASK_TYPE.AWS_SQS;
    public WEB_SOCKET = TASK_TYPE.WEB_SOCKET;
    public KAFKA = TASK_TYPE.KAFKA;
    public AWS_S3 = TASK_TYPE.AWS_S3;
    public AWS_LAMBDA = TASK_TYPE.AWS_LAMBDA;

    public selectedTaskType: any = 3;
    public topicName: any = '%s';
    public topicPartition: any = 1;
    public topicNamePatter = `^[-a-zA-Z0-9@\.+_]+$`;
    public topicPattern: any = `topic=${this.topicName}&partitions=[${this.topicPartition}]`;

    public TASK_TYPE: ILookups;
    public APPLICATION_STATUS: ILookups;
    public REQUEST_METHOD: ILookups;

    public credentials: ICredential[] = [];

    public sttForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        public commomService: CommomService,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private credentailService: CredentailService,
        private sourceTaskTypeService: SourceTaskTypeService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit() {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.TASK_TYPE
        }).subscribe((data) => {
            this.TASK_TYPE = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.REQUEST_METHOD
        }).subscribe((data) => {
            this.REQUEST_METHOD = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        this.fetchAllCredentialByType();
        if (this.actionType === ActionType.ADD) {
            this.sttForm = this.fb.group({
                serviceName: ['', [Validators.required]],
                description: ['', [Validators.required]],
                taskType: [this.selectedTaskType, [Validators.required]],
                credentialId: [''],
            });
            this.addKafkaTaskType();
        } else if (this.actionType === ActionType.EDIT) {
            this.selectedTaskType = this.editPayload.taskType.lookupCode;
            this.sttForm = this.fb.group({
                id: [this.editPayload.id, [Validators.required]],
                serviceName: [this.editPayload.serviceName, [Validators.required]],
                description: [this.editPayload.description, [Validators.required]],
                status: [this.editPayload.status.lookupCode, [Validators.required]],
                taskType: [this.editPayload.taskType.lookupCode, [Validators.required]],
                credentialId: [this.editPayload.credential ? this.editPayload?.credential.id : '']
            });
            this.sttForm.get('taskType').disable();
            // edit case no need to enable
            if (this.selectedTaskType === TASK_TYPE.KAFKA) {
                this.editKafkaTaskType(this.editPayload?.kafkaTaskType);
                return;
            }
            this.editApiTaskType(this.editPayload?.apiTaskType);
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.sttForm.controls;
    }

    get kafkaTaskType() {
        return this.sttForm.get('kafkaTaskType');
    }

    get apiTaskType() {
        return this.sttForm.get('apiTaskType');
    }

    public fetchAllCredentialByType(): any {
        this.spinnerService.show();
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            },
            types: [
                CREDENTIAL_TYPE.BASIC_AUTH,
                CREDENTIAL_TYPE.AUTHORIZATION_CODE,
                CREDENTIAL_TYPE.AWS_AUTH
            ]
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

    public onTaskTypeSelected(event: any): void {
        this.selectedTaskType = event;
        if (this.selectedTaskType === TASK_TYPE.KAFKA) {
            this.sttForm.removeControl('apiTaskType');
            this.addKafkaTaskType();
            return;
        }
        this.sttForm.removeControl('kafkaTaskType');
        this.addApiTaskType();
    }

    public changeOnTopicNameValue(value: any): void {
        this.topicName = value;
        this.topicPattern = `topic=${this.topicName}&partitions=[${this.topicPartition}]`;
    }

    public changeOnToppicPartition(value: any) {
        this.topicPartition = value;
        this.topicPattern = `topic=${this.topicName}&partitions=[${this.topicPartition}]`;
    }

    public addKafkaTaskType(): void {
        this.sttForm.addControl('kafkaTaskType',
            this.fb.group({
                numPartitions: [this.topicPartition, [Validators.required, Validators.min(1), Validators.max(10)]],
                topicName: ['', [Validators.required, Validators.pattern(this.topicNamePatter)]],
                topicPattern: [{ value: this.topicPattern, disabled: true }],
                serviceUrl: ['', [Validators.required]]
            }));
    }

    public editKafkaTaskType(payload: any): void {
        this.changeOnTopicNameValue(payload.topicName);
        this.changeOnToppicPartition(payload.numPartitions);
        this.topicPartition = payload.numPartitions;
        this.sttForm.addControl('kafkaTaskType',
            this.fb.group({
                numPartitions: [payload.numPartitions, [Validators.required, Validators.min(1), Validators.max(5)]],
                topicName: [payload.topicName, [Validators.required, Validators.pattern(this.topicNamePatter)]],
                topicPattern: [{ value: payload.topicPattern, disabled: true }],
                serviceUrl: [payload.serviceUrl, [Validators.required]]
            }));
        this.kafkaTaskType.get('topicPattern').disable();
    }

    public addApiTaskType(): void {
        this.sttForm.addControl('apiTaskType',
            this.fb.group({
                apiUrl: ['', [Validators.required]],
                httpMethod: [REQUEST_METHOD.POST, [Validators.required]]
            }));
    }

    public editApiTaskType(payload: any): void {
        this.sttForm.addControl('apiTaskType',
            this.fb.group({
                apiUrl: [payload.apiUrl, [Validators.required]],
                httpMethod: [payload.httpMethod.lookupCode, [Validators.required]]
            }));
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addSTT();
        } else if (this.actionType === ActionType.EDIT) {
            this.editSTT();
        }
    }

    public addSTT(): void {
        this.spinnerService.show();
        if (this.sttForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.sttForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.sourceTaskTypeService.addSTT(payload)
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

    public editSTT(): void {
        this.spinnerService.show();
        if (this.sttForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.sttForm.getRawValue(),
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.sourceTaskTypeService.editSTT(payload)
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