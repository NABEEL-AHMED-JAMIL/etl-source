import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';
import { ApiCode, CommomReportService } from 'src/app/_shared';
import { first } from 'rxjs';
import { AlertService, SpinnerService } from 'src/app/_helpers';

/**
 * Select | Multi Select
 * */
@Component({
    selector: 'dynamic-select',
    templateUrl: './dynamic-select.component.html',
    styleUrls: ['./dynamic-select.component.css']
})
export class DynamicSelectComponent extends DynamicFieldComponent implements OnInit {


    constructor(
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private commomReportService: CommomReportService) {
        super();
    }

    ngOnInit() {
        if (this.control.apiLkValue) {
            this.apiLkCall(this.control.apiLkValue);
        }
    }

    public apiLkCall(apiLkValue: any): void {
        this.spinnerService.show();
        this.commomReportService.fetchApiLKValue(apiLkValue)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.control.selectMenuOptions = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

}