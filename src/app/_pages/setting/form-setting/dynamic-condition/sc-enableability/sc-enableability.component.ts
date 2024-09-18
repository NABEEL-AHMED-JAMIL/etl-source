import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
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
    EnableAndVisibilityService,
    AuthenticationService,
    AuthResponse,
    IGenSection,
    IGenControl,
    ILookups,
    LookupService,
    LOOKUP_TYPE
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-sc-enableability',
    templateUrl: './sc-enableability.component.html',
    styleUrls: ['./sc-enableability.component.css']
})
export class SCEnableabilityComponent implements OnInit {

    public COMPARISON_OPERATORS: ILookups;
    public LOGICAL_OPERATORS: ILookups;
    public DYNAMIC_CONDITION: ILookups;

    // use case is we will select all section and base on select section we will
    // fetch control
    public sections: IGenSection[] = [];
    public controls: IGenControl[] = [];

    public enableabilityForm: FormGroup;
    public sessionUser: AuthResponse;

    constructor(private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private lookupService: LookupService,
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

    public enableabForm(): any {
        this.spinnerService.show();
        this.enableabilityForm = this.fb.group({
            enableabilitys: this.fb.array([this.buildEnableability()])
        });
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
        this.drawerRef.close();
    }

}
