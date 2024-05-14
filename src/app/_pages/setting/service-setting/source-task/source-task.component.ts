import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import { CuSourceTaskComponent } from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    SourceTaskService
} from 'src/app/_shared';

@Component({
    selector: 'app-source-task',
    templateUrl: 'source-task.component.html',
    styleUrls: ['source-task.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MgSourceTaskComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public searchDetails: any;
    public headerButton: any = [
        {
            type: 'plus-circle',
            color: 'red',
            spin: false,
            tooltipTitle: 'Add',
            action: ActionType.ADD
        },
        {
            type: 'reload',
            color: 'red',
            spin: false,
            tooltipTitle: 'Refresh',
            action: ActionType.RE_FRESH
        }
    ];
    // session user
    public sessionUser: AuthResponse;

    // test loop
    public iterationArray: number[] = Array(12).fill(0).map((x, i) => i);

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private sourceTaskService: SourceTaskService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit() {
        this.fetchAllSourceTask({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllSourceTask(payload: any): any {
        this.spinnerService.show();
        this.sourceTaskService.fetchAllSourceTask(payload)
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

    public deleteSourceTask(payload: any): void {
        this.spinnerService.show();
        this.sourceTaskService.deleteSourceTask(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllSourceTask({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuLookup(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteSourceTask({
                        id: payload.data.id,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllSourceTask({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchAllSourceTask({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add STT' : 'Edit STT',
            nzFooter: 'Once Source Task Created, Task Type Will Not Change',
            nzPlacement: 'right',
            nzWidth: 800,
            nzMaskClosable: false,
            nzContent: CuSourceTaskComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllSourceTask({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}