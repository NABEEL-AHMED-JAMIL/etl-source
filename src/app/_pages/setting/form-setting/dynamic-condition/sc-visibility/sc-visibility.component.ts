import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {
    AuthResponse,
    AuthenticationService,
    EnableAndVisibilityService,
    FormSettingService,
    IGenControl,
    IGenSection,
    ILookups,
    LOOKUP_TYPE,
    LookupService
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

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-sc-visibility',
    templateUrl: './sc-visibility.component.html',
    styleUrls: ['./sc-visibility.component.css']
})
export class SCVisibilityComponent implements OnInit {

    public COMPARISON_OPERATORS: ILookups;
    public LOGICAL_OPERATORS: ILookups;
    public DYNAMIC_CONDITION: ILookups;

    // we have to get the current section and control which are link in the section link control
    public section: IGenSection;
    public control: IGenControl;

    // use case is we will select all section and base on select section we will
    // fetch control
    public sections: IGenSection[] = [];
    public controls: IGenControl[] = [];

    public visibilityForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private lookupService: LookupService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private formSettingService: FormSettingService,
        private enableAndVisibilityService: EnableAndVisibilityService,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });

    }

    ngOnInit(): void {
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.COMPARISON_OPERATORS
        }).subscribe((data) => {
            this.COMPARISON_OPERATORS = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.LOGICAL_OPERATORS
        }).subscribe((data) => {
            this.LOGICAL_OPERATORS = data;
        });
        this.lookupService.fetchLookupDataByLookupType({
            lookupType: LOOKUP_TYPE.DYNAMIC_CONDITION
        }).subscribe((data) => {
            this.DYNAMIC_CONDITION = data;
        });
    }

    public visibalForm(): any {
        this.spinnerService.show();
        this.visibilityForm = this.fb.group({
            visibles: this.fb.array([this.buildVisibility()])
        });
        this.spinnerService.hide();
        console.log(this.visibilityForm.value);
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
        this.drawerRef.close();
    }

} 