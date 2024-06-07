import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
import {
    FormSettingService,
    AuthenticationService,
    AuthResponse,
    ActionType,
    IGenSection,
    ISectionLinkControl
} from 'src/app/_shared';


@Component({
    selector: 'app-sc-enableability',
    templateUrl: './sc-enableability.component.html',
    styleUrls: ['./sc-enableability.component.css']
})
export class SCEnableabilityComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public section: IGenSection;
    @Input()
    public control: ISectionLinkControl;


    public enableabilityForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private modalRef: NzModalRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });

    }

    ngOnInit(): void {
        this.addForm();
        if (this.actionType === ActionType.ADD) {
            this.addForm();
            console.log(this.enableabilityForm.value);
        } else if (this.actionType === ActionType.EDIT) {
            this.editForm();
        }
    }

    public addForm(): any {
        this.spinnerService.show();
        this.enableabilityForm = this.fb.group({
            enableabilitys: this.fb.array([this.buildEnableability()])
        });
        this.spinnerService.hide();
        console.log(this.enableabilityForm.value);
    }

    public editForm(): void {
        this.spinnerService.show();
        this.spinnerService.hide();
    }

    public buildEnableability(): any {
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
            enableability: new FormControl('', Validators.required)
        });
    }

    public onSubmit(): void {

    }

    // Just close the modal without passing any data
    public close(): void {
        this.modalRef.destroy();
    }

}
