import { Component, Input } from "@angular/core";
import { IControlFiled, ISection } from "../_shared";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
    template: ''
  })
export abstract class DynamicFieldComponent {

    @Input()
    public section: ISection;

    @Input()
    public control: IControlFiled;

    @Input()
    public fields: FormGroup;

    constructor() {
    }

    public getErrorMessage(control: IControlFiled): any {
        for (let validation of control.validators) {
            if (this.getFiledControl(control.name).hasError(validation.validator)) {
                return validation.message;
            }
        }
        return '';
    }
    
    public getFiledControl(controlName: any): FormControl {
        return this.fields.get(controlName) as FormControl;
    }

}