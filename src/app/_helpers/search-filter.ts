import { Pipe, PipeTransform } from '@angular/core';


/**
 * @author Nabeel Ahmed
 */
@Pipe({
    name: 'searchdata'
})
// Todo: Refactor this pipe to make it more efficient
export class SearchFilterPipe implements PipeTransform {

    public transform(value: any, args?: any): any {
        if (!value) return null;
        if (!args) return value;
        args = args.toLowerCase();
        return value.filter(function (data: any) {
            return JSON.stringify(data).toLowerCase().includes(args);
        });
    }

}