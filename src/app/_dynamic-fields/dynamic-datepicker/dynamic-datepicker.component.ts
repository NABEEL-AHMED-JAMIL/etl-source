import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';
import { DatePipe } from '@angular/common';
import { FILED_TYPE } from 'src/app/_shared';

/**
 * Text | Email | URL | Passwrod
 * */
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
        this.getFiledControl('value')
            .valueChanges.subscribe(value => {
                if (this.control.pattern && this.control.type.lookupCode != FILED_TYPE.WEEK) {
                    const formattedDate = this.datePipe.transform(value, this.control.pattern);
                    this.getFiledControl('value').setValue(formattedDate, { emitEvent: false });
                }
            });
    }

}