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
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    APPLICATION_STATUS,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    FILED_TYPE,
    FormSettingService,
    IGenControl,
    ILookups,
    IS_DEFAULT,
    LOOKUP_TYPE,
    LookupService
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-cu-control',
    templateUrl: './cu-control.component.html',
    styleUrls: ['./cu-control.component.css']
})
export class CUControlComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenControl;

    public loading: boolean = false;

    public hasKey: any = false;
    public fieldTypeForLkValue: any = false;
    public isMinAllow: any = true;
    public isMaxAllow: any = true;
    public isPatternAllow: any = false;

    public editAction = ActionType.EDIT;
    public genControlForm: FormGroup;
    public sessionUser: AuthResponse;

    public ISDEFAULT: ILookups;
    public FIELD_TYPE: ILookups;
    public APPLICATION_STATUS: ILookups;
    public fieldLkValueOption: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        public commomService: CommomService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        // APPLICATION_STATUS
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        // ISDEFAULT
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.IS_DEFAULT
        }).subscribe((data) => {
            this.ISDEFAULT = data;
        });
        // FIELD_TYPE
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.FIELD_TYPE
        }).subscribe((data) => {
            this.FIELD_TYPE = data;
        });
        if (this.actionType === ActionType.ADD) {
            this.addGenControlForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editGenControlForm();
        }
    }

    public addGenControlForm(): any {
        this.spinnerService.show();
        this.genControlForm = this.fb.group({
            controlName: ['', [Validators.required]],
            fieldTitle: ['', [Validators.required]],
            fieldName: ['', [Validators.required]],
            fieldType: [FILED_TYPE.TEXT, [Validators.required]],
            description: ['', [Validators.required]],
            placeHolder: [''],
            mandatory: [IS_DEFAULT.YES_DEFAULT, [Validators.required]],
            isDefault: [IS_DEFAULT.NO_DEFAULT, [Validators.required]],
            defaultValue: [''],
            pattern: [],
            minLength: [''],
            maxLength: [''],
            fieldLkValue: [],
            apiLkValue: []
        });
        this.spinnerService.hide();
    }

    public editGenControlForm(): void {
        this.spinnerService.show();
        this.genControlForm = this.fb.group({
            id: [this.editPayload.id, [Validators.required]],
            controlName: [this.editPayload.controlName, [Validators.required]],
            fieldTitle: [this.editPayload.fieldTitle, [Validators.required]],
            fieldName: [this.editPayload.fieldName, [Validators.required]],
            fieldType: [this.editPayload.fieldType.lookupCode, [Validators.required]],
            description: [this.editPayload.description, [Validators.required]],
            placeHolder: [this.editPayload.placeHolder],
            mandatory: [this.editPayload.mandatory.lookupCode, [Validators.required]],
            isDefault: [this.editPayload.isDefault.lookupCode, [Validators.required]],
            defaultValue: [this.editPayload.defaultValue],
            pattern: [this.editPayload.pattern],
            minLength: [this.editPayload.minLength],
            maxLength: [this.editPayload.maxLength],
            fieldLkValue: [this.editPayload.fieldLkValue],
            apiLkValue: [this.editPayload.apiLkValue],
            status: [this.editPayload.status.lookupCode, [Validators.required]],
        });
        if (this.editPayload.fieldType.lookupCode === FILED_TYPE.RADIO ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.CHECKBOX ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.SELECT ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.MULTI_SELECT ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.COLOR) {
            this.isMinAllow = false;
            this.isMaxAllow = false;
            this.isPatternAllow = false;
            this.hasKey = true;
            this.fieldTypeForLkValue = true;
            this.onChangefieldLkValue(this.editPayload.fieldLkValue);
            this.spinnerService.hide();
            return;
        } else if (this.editPayload.fieldType.lookupCode == FILED_TYPE.YEAR
            || this.editPayload.fieldType.lookupCode == FILED_TYPE.DATE
            || this.editPayload.fieldType.lookupCode == FILED_TYPE.DATETIME_LOCAL
            || this.editPayload.fieldType.lookupCode == FILED_TYPE.WEEK
            || this.editPayload.fieldType.lookupCode == FILED_TYPE.TIME
            || this.editPayload.fieldType.lookupCode == FILED_TYPE.MONTH) {
            this.isPatternAllow = true;
            this.fieldTypeForLkValue = false;
            this.isMinAllow = false;
            this.isMaxAllow = false;
            this.spinnerService.hide();
            return;
        } else if (this.editPayload.fieldType.lookupCode === FILED_TYPE.URL ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.EMAIL ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.PASSWORD ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.TEL ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.NUMBER ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.TEXT ||
            this.editPayload.fieldType.lookupCode === FILED_TYPE.TEXTAREA) {
            if (this.editPayload.fieldType.lookupCode === FILED_TYPE.TEXT ||
                this.editPayload.fieldType.lookupCode === FILED_TYPE.TEXTAREA) {
                this.isPatternAllow = false;
            } else {
                this.isPatternAllow = true;
            }
            this.isMinAllow = true;
            this.isMaxAllow = true;
            this.spinnerService.hide();
            return;
        } else {
            this.isMinAllow = false;
            this.isMaxAllow = false;
            this.isPatternAllow = false;
            this.spinnerService.hide();
        }
    }

    public onFieldType(payload: any): void {
        if (payload === FILED_TYPE.RADIO || payload === FILED_TYPE.CHECKBOX ||
            payload === FILED_TYPE.SELECT || payload === FILED_TYPE.MULTI_SELECT || payload === FILED_TYPE.COLOR) {
            if (payload !== FILED_TYPE.COLOR) {
                this.fieldTypeForLkValue = true;
            }
            this.isMinAllow = false;
            this.isMaxAllow = false;
            this.isPatternAllow = false;
            return;
        } else if (payload === FILED_TYPE.URL || payload === FILED_TYPE.EMAIL || payload === FILED_TYPE.PASSWORD
            || payload === FILED_TYPE.TEL || payload === FILED_TYPE.TEXT || payload === FILED_TYPE.TEXTAREA
            || payload === FILED_TYPE.NUMBER) {
            if (payload === FILED_TYPE.TEXT || payload === FILED_TYPE.TEXTAREA) {
                this.isPatternAllow = false;
            } else {
                this.isPatternAllow = true;
            }
            this.isMinAllow = true;
            this.isMaxAllow = true;
        } else if (payload == FILED_TYPE.YEAR || payload == FILED_TYPE.DATE 
            || payload == FILED_TYPE.DATETIME_LOCAL || payload == FILED_TYPE.MONTH
            || payload == FILED_TYPE.WEEK || payload == FILED_TYPE.TIME) {
            this.isPatternAllow = true;
            this.isMinAllow = false;
            this.isMaxAllow = false;
        } else {
            this.isMinAllow = false;
            this.isMaxAllow = false;
            this.isPatternAllow = false;
        }
        this.hasKey = false;
        this.fieldTypeForLkValue = false;
        this.fieldLkValueOption = undefined;
        this.genControlForm.controls['fieldLkValue'].setValue(null);
    }

    public onChangefieldLkValue(value: any): void {
        if (value != null && value != '') {
            this.hasKey = false;
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
                        this.hasKey = true;
                        this.fieldLkValueOption = response.data;
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

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addControl();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateControl();
        }
    }

    public addControl(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genControlForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genControlForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.addControl(payload)
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

    public updateControl(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genControlForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genControlForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.updateControl(payload)
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

    // convenience getter for easy access to form fields
    get genControl() {
        return this.genControlForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
