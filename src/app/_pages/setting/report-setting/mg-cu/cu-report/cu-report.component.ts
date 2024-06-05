import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    AuthResponse,
    AuthenticationService,
    EVariableService,
    ILookups,
    IReportSetting,
    LOOKUP_TYPE,
    LookupService,
    APPLICATION_STATUS,
    ReportSettingService,
    ApiCode,
    E_VARAIABLE,
    IGenFrom,
    FormSettingService,
    PAYLOAD_REF,
    ILookupData,
    EvenBridgeService,
    IEventBridge,
    EVENT_BRIDGE_TYPE,
    UI_LOOKUP
} from 'src/app/_shared';


@Component({
    selector: 'app-cu-report',
    templateUrl: './cu-report.component.html',
    styleUrls: ['./cu-report.component.css']
})
export class CUReportComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IReportSetting;

    public loading: boolean = false;
    public formRefShow: boolean = false;
    public editAction = ActionType.EDIT;

    public reportSettingForm: FormGroup;
    public sessionUser: AuthResponse;
    // ilookup
    public genForms: IGenFrom[] = [];
    public eventBridges: IEventBridge[] = [];
    public parentLookup: ILookupData[] = [];
    public APPLICATION_STATUS: ILookups;
    public REPORT_GROUP: ILookups;
    public PAYLOAD_REF: ILookups;
    public UI_LOOKUP: ILookups;
    public FETCH_LIMIT: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private envVarService: EVariableService,
        private formSettingService: FormSettingService,
        private reportSettingService: ReportSettingService,
        private evenBridgeService: EvenBridgeService,
        public commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchEventBridgeByBridgeType();
        this.fetchUserEnvByEnvKey();
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.UI_LOOKUP
        }).subscribe((data) => {
            this.UI_LOOKUP = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.FETCH_LIMIT
        }).subscribe((data) => {
            this.FETCH_LIMIT = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.PAYLOAD_REF
        }).subscribe((data) => {
            this.PAYLOAD_REF = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        if (this.actionType === ActionType.ADD) {
            this.addReportSettingForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editReportSettingForm();
        }
        // report form type
        this.fetchFormsByFormType({
            formType: UI_LOOKUP.TRUE,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.findAllParentLookupByUsername({
            uiLookup: 1,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchFormsByFormType(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.fetchFormsByFormType(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.genForms = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchEventBridgeByBridgeType() {
        this.spinnerService.show();
        let payload = {
            bridgeType: EVENT_BRIDGE_TYPE.API_SENDER
        };
        this.evenBridgeService.fetchEventBridgeByBridgeType(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.eventBridges = response.data;
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchUserEnvByEnvKey(): any {
        this.spinnerService.show();
        let payload = {
            envKey: E_VARAIABLE.REPORT_GROUP,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.envVarService.fetchUserEnvByEnvKey(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.REPORT_GROUP = response.data;
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public addReportSettingForm(): any {
        this.spinnerService.show();
        this.reportSettingForm = this.fb.group({
            dateFilter:[0, Validators.required],
            fetchRate:[0, Validators.required],
            name: ['', Validators.required],
            groupType: ['', Validators.required],
            description: ['', Validators.required],
            payloadRef: ['', Validators.required],
            isPdf: [0, Validators.required],
            pdfBridgeId: [],
            isXlsx: [0, Validators.required],
            xlsxBridgeId: [],
            isCsv: [0, Validators.required],
            csvBridgeId: [],
            isData: [0, Validators.required],
            dataBridgeId: [],
            isFirstDimension: [0, Validators.required],
            firstDimensionBridgeId: ['', Validators.required],
            firstDimensionLKValue: ['', Validators.required],
            isSecondDimension: [0, Validators.required],
            secondDimensionBridgeId: ['', Validators.required],
            secondDimensionLKValue: ['', Validators.required],
            distinctLKValue: [],
            aggLKValue: []
        });
        this.spinnerService.hide();
    }

    public editReportSettingForm(): void {
        this.spinnerService.show();
        this.reportSettingForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            dateFilter:[this.editPayload.dateFilter?.lookupCode, Validators.required],
            fetchRate:[this.editPayload.fetchRate?.lookupCode, Validators.required],
            name: [this.editPayload.name, Validators.required],
            groupType: [this.editPayload.groupType?.lookupType, Validators.required],
            description: [this.editPayload.description, Validators.required],
            payloadRef: [this.editPayload.payloadRef?.lookupCode, Validators.required],
            isPdf: [this.editPayload.isPdf?.lookupCode, Validators.required],
            pdfBridgeId: [this.editPayload.pdfBridge?.id],
            isXlsx: [this.editPayload.isXlsx?.lookupCode, Validators.required],
            xlsxBridgeId: [this.editPayload.xlsxBridge?.id],
            isCsv: [this.editPayload.isCsv?.lookupCode, Validators.required],
            csvBridgeId: [this.editPayload.csvBridge?.id],
            isData: [this.editPayload.isData?.lookupCode, Validators.required],
            dataBridgeId: [this.editPayload.dataBridge?.id],
            isFirstDimension: [this.editPayload.isFirstDimension?.lookupCode, Validators.required],
            firstDimensionBridgeId: [this.editPayload.firstDimensionBridge?.id, Validators.required],
            firstDimensionLKValue: [this.editPayload.firstDimensionLKValue?.lookupType, Validators.required],
            isSecondDimension: [this.editPayload.isSecondDimension?.lookupCode, Validators.required],
            secondDimensionBridgeId: [this.editPayload.secondDimensionBridge?.id, Validators.required],
            secondDimensionLKValue: [this.editPayload.secondDimensionLKValue?.lookupType, Validators.required],
            distinctLKValue: [this.editPayload.distinctLKValue?.lookupType],
            aggLKValue: [this.editPayload.aggLKValue?.lookupType],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        if (this.editPayload.payloadRef?.lookupCode == PAYLOAD_REF.REF_REPORT_FORM) {
            this.reportSettingForm.addControl('formRequestId', new FormControl(this.editPayload.formResponse?.id, Validators.required));
            this.formRefShow = true;
        }
        this.spinnerService.hide();
    }

    public onChangefieldLkValue(value: any): void {
        if (value != null && value != '') {
            this.spinnerService.show();
            let payload = {
                lookupType: value,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            this.lookupService.fetchLookupDataByLookupType(payload)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    if (response) {
                        if (response.status === ApiCode.ERROR) {
                            this.alertService.showError('No lookup found', ApiCode.ERROR);
                            return;
                        } else if (response.data?.subLookupData.length === 0) {
                            this.alertService.showError('Lookup not valid', ApiCode.ERROR);
                            return;
                        }
                    } else {
                        this.alertService.showError('Lookup not valid', ApiCode.ERROR);
                        return;
                    }
                }, (response: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(response.error.message, ApiCode.ERROR);
                });
        }
    }

    public onChangePayloadRefValue(value: any): void {
        if (value != null && value == PAYLOAD_REF.REF_REPORT_FORM) {
            this.reportSettingForm.addControl('formRequestId', new FormControl('', Validators.required));
            this.formRefShow = true;
            return;
        }
        this.reportSettingForm.removeControl('formRequestId');
        this.formRefShow = false;
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addReportSetting();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateReportSetting();
        }
    }

    public addReportSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.reportSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.reportSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.reportSettingService.addReportSetting(payload)
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
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    public updateReportSetting(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.reportSettingForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.reportSettingForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.reportSettingService.updateReportSetting(payload)
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
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    // fetch all lookup
    public findAllParentLookupByUsername(payload: any): any {
        this.spinnerService.show();
        this.lookupService.findAllParentLookupByUsername(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.parentLookup = response.data
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get reportSetting() {
        return this.reportSettingForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
