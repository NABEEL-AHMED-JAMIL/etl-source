import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchdatav2'
})
export class SearchFilterPipeV2 implements PipeTransform {

    public transform(value: any, searchDetails: string, fullData: any[]): any {
        if (!value) return null;
        if (!searchDetails) return value;
        searchDetails = searchDetails.toLowerCase();
        return fullData.filter(function (data) {
            return JSON.stringify(data).toLowerCase().includes(searchDetails);
        });
    }
}
