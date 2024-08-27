import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { first } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
    ActionType,
    ApiCode,
    APPLICATION_STATUS,
    AuthenticationService,
    AuthResponse,
    ILookups,
    IQueryInquiry,
    LOOKUP_TYPE,
    LookupService,
    SettingService
} from 'src/app/_shared';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';


@Component({
    selector: 'app-cu-query-inquiry',
    templateUrl: './cu-query-inquiry.component.html',
    styleUrls: ['./cu-query-inquiry.component.css']
})
export class CUQueryInquiryComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IQueryInquiry;

    public loading: boolean = false;
    public editAction = ActionType.EDIT;
    public queryInquiryForm: FormGroup;

    public APPLICATION_STATUS:ILookups;
    public sessionUser: AuthResponse;

    constructor(
        private fb: FormBuilder,
        private modalRef: NzModalRef<void>,
        private alertService: AlertService,
        public commomService: CommomService,
        private spinnerService: SpinnerService,
        private settingService: SettingService,
        private lookupService: LookupService,
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
        if (this.actionType === ActionType.ADD) {
            this.addQueryInquiryForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editQueryInquiryForm();
        }
    }

    public addQueryInquiryForm(): any {
        this.spinnerService.show();
        this.queryInquiryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            query: ['', Validators.required],
        });
        this.spinnerService.hide();
    }

    public editQueryInquiryForm(): void {
        this.spinnerService.show();
        this.queryInquiryForm = this.fb.group({
            id: [this.editPayload.id, Validators.required],
            name: [this.editPayload.name, Validators.required],
            description: [this.editPayload.description, Validators.required],
            query: [this.editPayload.query, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
        this.spinnerService.hide();
    }

    public onSubmit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addQueryInquiry();
        } else if (this.actionType === ActionType.EDIT) {
            this.updateQueryInquiry();
        }
    }

    public addQueryInquiry(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.queryInquiryForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.queryInquiryForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.settingService.addQueryInquiry(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeModel();
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public updateQueryInquiry(): void {
        this.loading = true;
        this.spinnerService.show();
        if (this.queryInquiryForm.invalid) {
            this.spinnerService.hide();
            return;
        }
        let payload = {
            ...this.queryInquiryForm.value,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.settingService.updateQueryInquiry(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                this.closeModel();
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // convenience getter for easy access to form fields
    get queryInquiry() {
        return this.queryInquiryForm.controls;
    }

    public closeModel(): void {
        this.modalRef.close();
    }


}