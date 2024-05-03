import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IFrom,
    PlayGroundService
} from 'src/app/_shared';


@Component({
    selector: 'app-play-ground',
    templateUrl: './play-ground.component.html',
    styleUrls: ['./play-ground.component.css']
})
export class MgPlayGroundComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public selectedForm: any;
    //
    public sessionUser: AuthResponse;
    public palyGroundForm: FormGroup;
    public dynamicForms: IFrom[];
    public dynamicRanderForms: IFrom;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private playGroundService: PlayGroundService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
        this.addPalyGroundForm(this.commomService.getDate29DaysAgo(
            this.commomService.getCurrentDate()), this.commomService.getCurrentDate());
        this.onDateChangeEvent();
    }

    ngOnInit(): void {
    }

    public addPalyGroundForm(startDate: any, endDate: any): any {
        this.spinnerService.show();
        this.palyGroundForm = this.fb.group({
            startDate: [startDate, Validators.required],
            endDate: [endDate, [Validators.required]],
            formId: []
        });
        this.spinnerService.hide();
    }

    public onDateChangeEvent(): void {
        this.fetchAllFormForPlayGround({
            startDate: this.palyGroundForm.get('startDate').value,
            endDate: this.palyGroundForm.get('endDate').value,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllFormForPlayGround(payload: any): any {
        this.spinnerService.show();
        this.playGroundService.fetchAllFormForPlayGround(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.selectedForm = null;
                this.dynamicForms = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public onFormChange(formId: any): any {
        if (formId) {
            this.spinnerService.show();
            let request = {
                id: formId,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            this.playGroundService.fetchFormForPlayGroundByFormId(request)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    if (response.status === ApiCode.ERROR) {
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.dynamicRanderForms = response.data;
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(error.message, ApiCode.ERROR);
                });
            this.spinnerService.hide();    
        }
    }
    

}