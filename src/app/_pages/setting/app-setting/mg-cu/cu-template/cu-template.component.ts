import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import {
    AlertService,
    SpinnerService
} from '../../../../../_helpers';
import { first } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';


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

    public loading: boolean = false;
    public templateForm: FormGroup;

    public EMAIL_TEMPLATE:ILookups;
    public APPLICATION_STATUS:ILookups;
    public sessionUser: AuthResponse;

    constructor(private formBuilder: FormBuilder,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private templateRegService: TemplateRegService,
        private drawerRef: NzDrawerRef<void>,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
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
        this.spinnerService.show();
        this.templateForm = this.formBuilder.group({
            templateName: ['', Validators.required],
            description: ['', Validators.required],
            templateContent: ['', Validators.required]
        });
        this.spinnerService.hide();
    }

    public editTemplateForm(): void {
        this.spinnerService.show();
        this.templateForm = this.formBuilder.group({
            id: [this.editPayload.id, Validators.required],
            templateName: [this.editPayload.templateName, Validators.required],
            description: [this.editPayload.description, Validators.required],
            templateContent: [this.editPayload.templateContent, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public submit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addTemplate();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateTemplate();
        }
    }

    public addTemplate(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.templateForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.templateForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.templateRegService.addTemplateReg(payload)
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
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public updateTemplate(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.templateForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.templateForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.templateRegService.editTemplateReg(payload)
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
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get template() {
        return this.templateForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
