import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DynamicFieldComponent } from '../dynmic-field';
import { FILED_TYPE } from '../../../_shared';

/**
 * Text | Email | URL | Passwrod
 * */
/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'dynamic-datepicker',
    templateUrl: './dynamic-datepicker.component.html',
    styleUrls: ['./dynamic-datepicker.component.css']
})
export class DynamicDatePickerComponent extends DynamicFieldComponent implements OnInit {

    constructor(private datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
        this.getFiledControl('value').valueChanges
            .subscribe(value => {
                if (this.control.pattern && this.control.type.lookupCode != FILED_TYPE.WEEK) {
                    const formattedDate = this.datePipe.transform(value, this.control.pattern);
                    this.getFiledControl('value').setValue(formattedDate, { emitEvent: false });
                }
            });
    }

}