import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    ISourceTask,
    LookupService,
    SourceTaskService
} from 'src/app/_shared';


@Component({
    selector: 'cu-source-task',
    templateUrl: 'cu-source-task.component.html',
    styleUrls: ['cu-source-task.component.css']
})
export class CuSourceTaskComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISourceTask;

    public editAction = ActionType.EDIT;

    public sourceTaskForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
        private sourceTaskService: SourceTaskService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit() {
    }

    public fetchAllSTT(): any {
        this.spinnerService.show();
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.sourceTaskService.fetchAllSTT(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

}