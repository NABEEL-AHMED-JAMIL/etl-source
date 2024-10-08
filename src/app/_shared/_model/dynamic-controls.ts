export interface IFrom {
    id?: any;
    uuid?: any;
    name: any;
    description: any;
    sections?: ISection[];
}

export interface ISection {
    id?: any;
    uuid?: any;
    name?: any;
    controls?: IControlFiled[];
}

export interface IControlFiled {
    id?: any;
    uuid?: any;
    type?: any;
    label?: any;
    name?: any;
    value?: any;
    pattern: any;
    placeHolder?: any;
    width?: any; // will use for div col
    selectMenuOptions?: any; // fieldLkValue value
    apiLkValue?: any;
    disabledPattern?: any;
    visiblePattern?: any;
    validators?: IValidation[];
}

// minLength?: any; // validation
// maxLength?: any; // validation
// mandatory?: any; // validation
// pattern?: any; // validation
export interface IValidation {
    validator?: any;
    message?: any;
    pattern?: any;
}

export enum ErrorAssosiation {
    REQUIRED = 'required',
    MINLENGTH = 'minlength',
    MAXLENGTH = 'maxlength',
    EMAIL = 'email',
    MIN = 'min',
    MAX = 'max',
    PATTERN = 'pattern'
}