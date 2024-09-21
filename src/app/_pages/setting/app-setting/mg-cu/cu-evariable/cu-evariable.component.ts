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
    CommomService
} from 'src/app/_helpers';
import {
    ActionType,
    IEnVariables,
    ILookups,
    LookupService,
    LOOKUP_TYPE,
    APPLICATION_STATUS,
    ApiCode,
    EVariableService
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-cu-evariable',
    templateUrl: './cu-evariable.component.html',
    styleUrls: ['./cu-evariable.component.css']
})
export class CUEvariableComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IEnVariables;

    public editAction = ActionType.EDIT;
    public enVariablesForm: FormGroup;
    public APPLICATION_STATUS: ILookups;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private lookupService: LookupService,
        private eVariableService: EVariableService,
        public commomService: CommomService) {
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
            this.addEnVariablesForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editEnVariablesForm();
        }
    }

    public addEnVariablesForm(): any {
        this.enVariablesForm = this.fb.group({
            envKey: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public editEnVariablesForm(): void {
        this.enVariablesForm = this.fb.group({
            uuid: [this.editPayload.uuid, Validators.required],
            envKey: [this.editPayload.envKey, Validators.required],
            description: [this.editPayload.description, Validators.required],
            status: [this.editPayload.status?.lookupCode, Validators.required]
        });
    }

    public submit(): void {
        if (this.enVariablesForm.invalid) {
            return;
        }
        let payload = {
            ...this.enVariablesForm.value
        }
        if (this.actionType === ActionType.ADD) {
            this.addEnVariable(payload);
        } else if (this.actionType === ActionType.EDIT) {
            this.updateEnVariable(payload);
        }
    }

    public addEnVariable(payload: any): void {
        this.eVariableService.addEnVariable(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                    this.drawerRef.close();
                }
            ));
    }

    public updateEnVariable(payload: any): void {
        this.eVariableService.updateEnVariable(payload).pipe(first())
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
