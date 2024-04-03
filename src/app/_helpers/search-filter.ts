import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'searchdata'
})
export class SearchFilterPipe implements PipeTransform {

    public transform(value: any, args?: any): any {
        if (!value) return null;
        if (!args) return value;
        args = args.toLowerCase();
        return value.filter(function (data) {
            return JSON.stringify(data).toLowerCase().includes(args);
        });
    }

}