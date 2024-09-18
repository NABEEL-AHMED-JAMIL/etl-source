import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';
import { ApiCode, CommomReportService } from 'src/app/_shared';
import { first } from 'rxjs';
import { AlertService } from 'src/app/_helpers';

/**
 * Select | Multi Select
 * */
/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'dynamic-select',
    templateUrl: './dynamic-select.component.html',
    styleUrls: ['./dynamic-select.component.css']
})
export class DynamicSelectComponent extends DynamicFieldComponent implements OnInit {


    constructor(
        private alertService: AlertService,
        private commomReportService: CommomReportService) {
        super();
    }

    ngOnInit() {
        if (this.control.apiLkValue) {
            this.apiLkCall(this.control.apiLkValue);
        }
    }

    public apiLkCall(apiLkValue: any): void {
        this.commomReportService.fetchApiLKValue(apiLkValue).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.control.selectMenuOptions = response.data;
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