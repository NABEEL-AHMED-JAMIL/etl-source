import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    ISourceTask,
    SourceTaskService
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
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
        private alertService: AlertService,
        private sourceTaskService: SourceTaskService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
    }

    public fetchAllSTT(): any {
        let payload = {
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.sourceTaskService.fetchAllSTT(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {

                })
            );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}