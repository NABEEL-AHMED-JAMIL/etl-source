import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { IControlFiled, FILED_TYPE } from '../_shared';


@Injectable({ providedIn: 'root' })
export class CommomService {

    constructor(private datePipe: DatePipe) {
    }

    private uuid(): string {
        return 'xxxxxxxx-xxxxxxxx'.replace(/[xy]/g, (char) => {
            let random = Math.random() * 16 | 0;
            let value = char === "x" ? random : (random % 4 + 8);
            return value.toString(16);
        });
    }

    public createFile(payload: any): any {
        const file = new Blob(
            [JSON.stringify(payload, null, 4)],
            { 
                type: 'application/json'
            });
        saveAs(file, 'ETL ' + this.uuid() + '.json');
    }

    public downLoadFile(data: any): void {
        let blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
    }

    public getCurrentDate(): any {
        var date = new Date();
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    }

    public getDate29DaysAgo(startDate: any): any {
        const msInOneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        const startDateObj = new Date(startDate); // Convert the start date to a Date object
        const endDateObj = new Date(startDateObj.getTime() - 29 * msInOneDay); // Calculate the end date    
        // Format the end date as "YYYY-MM-DD"
        const endDateFormatted = endDateObj.toISOString().split('T')[0];
        return endDateFormatted;
    }

    public getDate364DaysAgo(startDate: any): any {
        const msInOneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        const startDateObj = new Date(startDate); // Convert the start date to a Date object
        const endDateObj = new Date(startDateObj.getTime() - 354 * msInOneDay); // Calculate the end date    
        // Format the end date as "YYYY-MM-DD"
        const endDateFormatted = endDateObj.toISOString().split('T')[0];
        return endDateFormatted;
    }

    public formatToISO(date: Date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
    }

    public formatToGMT(date: Date): string {
        return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm a');
    }

    public getDataFromObject(payload: any): any {
        if (payload && typeof payload == 'object') {
            return payload?.lookupValue;
        }
        return payload;
    }

    public getDataFromObjectV2(payload: any): any {
        if (payload && typeof payload == 'object') {
            return payload?.lookupValue;
        }
        return payload ? payload : 'No Data';
    }

    public getDataFromObjectV3(parent: any, child: any): any {
        if (parent && typeof parent == 'object') {
            return parent[child];
        }
    }

    public getMultiDataFromObject(payload: any, fieldList: any): any {
        if (payload && typeof payload == 'object') {
            const filteredFields = Object.keys(payload)
                .filter(key => fieldList.includes(key))
                .map(key => payload[key]);
            return filteredFields.join("=>");
        }
        return payload ? payload : 'No Data';
    }

    public isShow(row: any, action: any): any {
        if (action.condition === 'NEQ') {
            return row[action.targetFiled].lookupCode !== action.targetValue
        } else if (action.condition === 'EQ') {
            return row[action.targetFiled].lookupCode === action.targetValue
        } else if (action.condition === 'PEQ') {
            return row[action.targetFiled][action.subfield] === action.targetValue;
        }
        return true;
    }

    public isSupportedInputControl(control: IControlFiled): any {
        let type = control.type;
        if (FILED_TYPE.URL === type.lookupCode || 
            FILED_TYPE.RANGE === type.lookupCode ||
            FILED_TYPE.WEEK === type.lookupCode ||
            FILED_TYPE.TEXT === type.lookupCode || 
            FILED_TYPE.NUMBER === type.lookupCode || 
            FILED_TYPE.TIME === type.lookupCode || 
            FILED_TYPE.DATETIME_LOCAL === type.lookupCode ||
            FILED_TYPE.EMAIL === type.lookupCode ||
            FILED_TYPE.PASSWORD === type.lookupCode) {
            return true;
        }
        return false;
    }

    public isSupportedSelectControl(control: IControlFiled): any {
        let type = control.type;
        if (FILED_TYPE.SELECT === type.lookupCode || 
            FILED_TYPE.MULTI_SELECT === type.lookupCode) {
            return true;
        }
        return false;
    }

    public isSupportedTextControl(control: IControlFiled): any {
        return control.type.lookupCode === FILED_TYPE.TEXTAREA ? true : false;
    }

    public isSupportedTelControl(control: IControlFiled): any {
        return control.type.lookupCode === FILED_TYPE.TEL ? true : false;
    }

    public isSupportedNumberControl(control: IControlFiled): any {
        return control.type.lookupCode === FILED_TYPE.NUMBER ? true : false;
    }

    public isSupportedDatePickerControl(control: IControlFiled): any {
        let type = control.type;
        if ( 
            FILED_TYPE.MONTH === type.lookupCode ||
            FILED_TYPE.YEAR === type.lookupCode ||
            FILED_TYPE.DATE === type.lookupCode) {
            return true;
        }
        return false;
    }

    public isSupportedTimePickerControl(control: IControlFiled): any {
        let type = control.type;
        if (FILED_TYPE.TIME === type.lookupCode) {
            return true;
        }
        return false;
    }

    public isValidHttpUrl(inputUrl: any): boolean {
        let url: any;
        try {
            url = new URL(inputUrl);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

}