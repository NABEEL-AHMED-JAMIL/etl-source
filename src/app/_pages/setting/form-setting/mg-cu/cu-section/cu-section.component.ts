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
    FormSettingService,
    IGenSection,
    ILookups,
    LOOKUP_TYPE,
    LookupService
} from 'src/app/_shared';

@Component({
    selector: 'app-cu-section',
    templateUrl: './cu-section.component.html',
    styleUrls: ['./cu-section.component.css']
})
export class CUSectionComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenSection;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;

    public genSectionForm: FormGroup;
    public sessionUser: AuthResponse;

    public APPLICATION_STATUS: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService,
        private lookupService: LookupService,
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
        if (this.actionType === ActionType.ADD) {
            this.addGenSectionForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editGenSectionForm();
        }
    }

    public addGenSectionForm(): any {
        this.spinnerService.show();
        this.genSectionForm = this.fb.group({
            sectionName: ['', Validators.required],
            description: ['', [Validators.required]],
        });
        this.spinnerService.hide();
    }

    public editGenSectionForm(): void {
        this.spinnerService.show();
        this.genSectionForm = this.fb.group({
            id: [this.editPayload.id],
            sectionName: [this.editPayload.sectionName, Validators.required],
            description: [this.editPayload.description, [Validators.required]],
            status: [this.editPayload.status.lookupCode, [Validators.required]],
        });
        this.spinnerService.hide();
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addSection();
        } else if (this.actionType === ActionType.EDIT) {
            this.editSection();
        }
    }

    public addSection(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genSectionForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genSectionForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.addSection(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.closeDrawer();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public editSection(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.genSectionForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.genSectionForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.formSettingService.editSection(payload)
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
    get genSection() {
        return this.genSectionForm.controls;
    }

    public closeDrawer(): void {
        this.drawerRef.close();
    }

}
