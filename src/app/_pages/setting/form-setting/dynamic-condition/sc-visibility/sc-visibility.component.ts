import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
    ActionType,
    AuthResponse,
    IGenSection,
    ISectionLinkControl
} from 'src/app/_shared';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';


@Component({
    selector: 'app-sc-visibility',
    templateUrl: './sc-visibility.component.html',
    styleUrls: ['./sc-visibility.component.css']
})
export class SCVisibilityComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public section: IGenSection;
    @Input()
    public control: ISectionLinkControl;

    public visibilityForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private modalRef: NzModalRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService) {
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editForm();
        }
    }

    public addForm(): any {
        this.spinnerService.show();
        this.visibilityForm = this.fb.group({
            visibles: this.fb.array([this.buildVisibility()])
        });
        console.log(this.visibilityForm.value);
    }

    public editForm(): void {
        this.spinnerService.show();
        this.spinnerService.hide();
    }

    public buildVisibility(): any {
        return new FormGroup({
            case: this.buildCase(),
            then: this.fb.array([ this.buildThen() ], Validators.required)
        });
    }

    public buildCase(): any {
        return new FormGroup({
            pattern: new FormControl('', Validators.required),
            sectionId: new FormControl('', Validators.required),
            controlId: new FormControl('', Validators.required),
            condition: new FormControl('', Validators.required),
            value: new FormControl('', Validators.required)
        });
    }

    // method use to create the the build
    public buildThen(): any {
        return new FormGroup({
            sectionId: new FormControl('', Validators.required),
            controlId: new FormControl('', Validators.required),
            visibility: new FormControl('', Validators.required)
        });
    }

    public onSubmit(): void {

    }

    // Just close the modal without passing any data
    public close(): void {
        this.modalRef.destroy();
    }

} 