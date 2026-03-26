import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { first } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
    ActionType,
    ApiCode,
    IQueryInquiry,
    SettingService
} from '../../../../../_shared';
import {
    AlertService,
    CommomService
} from '../../../../../_helpers';


/**
 * @author Nabeel Ahmed
 */
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

    public editAction = ActionType.EDIT;
    public queryInquiryForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modalRef: NzModalRef<void>,
        private alertService: AlertService,
        public commomService: CommomService,
        private settingService: SettingService) {
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addQueryInquiryForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editQueryInquiryForm();
        }
    }

    public addQueryInquiryForm(): any {
        this.queryInquiryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            query: ['', Validators.required],
        });
    }

    public editQueryInquiryForm(): void {
        this.queryInquiryForm = this.fb.group({
            uuid: [this.editPayload.uuid, Validators.required],
            name: [this.editPayload.name, Validators.required],
            description: [this.editPayload.description, Validators.required],
            query: [this.editPayload.query, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public onSubmit(): void {
        if (this.queryInquiryForm.invalid) {
            return;
        }
        let payload = {
            ...this.queryInquiryForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addQueryInquiry(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateQueryInquiry(payload);
        }
    }

    public addQueryInquiry(payload: any): void {
        this.settingService.addQueryInquiry(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(ApiCode.SUCCESS, response.message);
                    this.modalRef.close();
                }
            ));
    }

    public updateQueryInquiry(payload: any): void {
        this.settingService.updateQueryInquiry(payload).pipe(first())
        .subscribe((response: any) => 
            this.handleApiResponse(response, () => {
                this.alertService.showSuccess(ApiCode.SUCCESS, response.message);
                this.modalRef.close();
            })
        );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(ApiCode.ERROR, response.message);
            return;
        }
        successCallback();
    }

}