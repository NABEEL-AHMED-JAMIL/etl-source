import { Component, OnInit, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    ApiCode,
    ILookups,
    ITemplateReg,
    ActionType,
    LOOKUP_TYPE,
    TemplateRegService,
    AuthResponse,
    AuthenticationService,
    LookupService,
    APPLICATION_STATUS
} from '../../../../../_shared';
import { AlertService } from '../../../../../_helpers';
import { first } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-cu-template',
    templateUrl: './cu-template.component.html',
    styleUrls: ['./cu-template.component.css']
})
export class CUTemplateComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ITemplateReg;

    public editAction = ActionType.EDIT;
    public sessionUser: AuthResponse;
    public EMAIL_TEMPLATE:ILookups;
    public APPLICATION_STATUS:ILookups;
    public templateForm: FormGroup;

    constructor(
        private drawerRef: NzDrawerRef<void>,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private lookupService: LookupService,
        private templateRegService: TemplateRegService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue;
    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.EMAIL_TEMPLATE
        }).subscribe((data) => {
            this.EMAIL_TEMPLATE = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.APPLICATION_STATUS
        }).subscribe((data) => {
            this.APPLICATION_STATUS = data;
            this.APPLICATION_STATUS.SUB_LOOKUP_DATA = this.APPLICATION_STATUS.SUB_LOOKUP_DATA
                .filter((data) => data.lookupCode !== APPLICATION_STATUS.DELETE);
        });
        if (this.actionType === ActionType.ADD) {
            this.addTemplateForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editTemplateForm();
        }
    }

    public addTemplateForm(): any {
        this.templateForm = this.formBuilder.group({
            templateName: ['', Validators.required],
            description: ['', Validators.required],
            templateContent: ['', Validators.required]
        });
    }

    public editTemplateForm(): void {
        this.templateForm = this.formBuilder.group({
            uuid: [this.editPayload.uuid, Validators.required],
            templateName: [this.editPayload.templateName, Validators.required],
            description: [this.editPayload.description, Validators.required],
            templateContent: [this.editPayload.templateContent, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.templateForm.invalid) {
            return;
        }
        let payload = {
            ...this.templateForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addTemplate(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateTemplateReg(payload);
        }
    }

    public addTemplate(payload: any): void {
        this.templateRegService.addTemplateReg(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    public updateTemplateReg(payload: any): void {
        this.templateRegService.updateTemplateReg(payload).pipe(first())
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
