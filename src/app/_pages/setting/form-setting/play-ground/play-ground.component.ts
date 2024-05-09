import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    FILED_TYPE,
    IFrom,
    IValidation,
    PlayGroundService
} from 'src/app/_shared';


@Component({
    selector: 'app-play-ground',
    templateUrl: './play-ground.component.html',
    styleUrls: ['./play-ground.component.css']
})
export class MgPlayGroundComponent implements OnInit {

    public date = null;

    public sessionUser: AuthResponse;
    public palyGroundForm: FormGroup;
    public rootForm: FormGroup;
    // form list
    public dynamicForms: IFrom[];
    // single selected form with detail
    public selectedForm: IFrom;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        public commomService: CommomService,
        private spinnerService: SpinnerService,
        private playGroundService: PlayGroundService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
        this.addPalyGroundForm(this.commomService.getDate29DaysAgo(
            this.commomService.getCurrentDate()), this.commomService.getCurrentDate());
        this.onDateChangeEvent();
    }

    ngOnInit(): void {
    }

    public addPalyGroundForm(startDate: any, endDate: any): any {
        this.spinnerService.show();
        this.palyGroundForm = this.fb.group({
            startDate: [startDate, Validators.required],
            endDate: [endDate, [Validators.required]],
            formId: []
        });
        this.spinnerService.hide();
    }

    public onDateChangeEvent(): void {
        this.fetchAllFormForPlayGround({
            startDate: this.palyGroundForm.get('startDate').value,
            endDate: this.palyGroundForm.get('endDate').value,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllFormForPlayGround(payload: any): any {
        this.spinnerService.show();
        this.playGroundService.fetchAllFormForPlayGround(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.dynamicForms = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public onFormChange(formId: any): any {
        if (formId) {
            this.spinnerService.show();
            let request = {
                id: formId,
                sessionUser: {
                    username: this.sessionUser.username
                }
            }
            this.playGroundService.fetchFormForPlayGroundByFormId(request)
                .pipe(first())
                .subscribe((response: any) => {
                    this.spinnerService.hide();
                    if (response.status === ApiCode.ERROR) {
                        this.alertService.showError(response.message, ApiCode.ERROR);
                        return;
                    }
                    this.selectedForm = response.data; 
                    this.formInit(response.data);
                }, (error: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(error.message, ApiCode.ERROR);
                });
            this.spinnerService.hide();    
        }
    }

    public formInit(formJson: IFrom): void {
        this.rootForm = this.fb.group({});
        formJson.sections.forEach((section: any) => {
            let sectionGroup: FormGroup = this.fb.group({
                id: new FormControl(section.id, Validators.required),
                name: new FormControl(section.name, Validators.required),
                order: new FormControl(section.order, Validators.required),
            });
            // Loop through fields in the section
            let fieldsControls: FormGroup = this.fb.group({});
            section.controls.forEach((control: any) => {
                if (control.type.lookupCode === FILED_TYPE.MULTI_SELECT || control.type.lookupCode === FILED_TYPE.SELECT) {
                    fieldsControls.addControl(control.name, new FormControl(
                        control.value !== '' ? control.value : null, this.controlValidators(control.validators)));
                } else if (control.type.lookupCode === FILED_TYPE.DATE) {
                    fieldsControls.addControl(control.name, new FormControl(
                        control.value !== '' ? control.value : null, this.controlValidators(control.validators)));
                } else {
                    fieldsControls.addControl(control.name, new FormControl(control.value, this.controlValidators(control.validators)));
                }
            });
            sectionGroup.addControl("fields", fieldsControls);
            this.rootForm.addControl("section-" + section.id, sectionGroup);
        });
    }

    private controlValidators(controlValidators: IValidation[]): any {
        let validators = [];
        if (controlValidators) {
            controlValidators.forEach((validation: any) => {
                switch (validation.validator) {
                    case 'required':
                        validators.push(Validators.required);
                        break;
                    case 'pattern':
                        validators.push(Validators.pattern(validation.pattern));
                        break;
                    case 'minlength':
                        validators.push(Validators.minLength(validation.pattern));
                        break;
                    case 'maxlength':
                        validators.push(Validators.maxLength(validation.pattern));
                        break;
                }
            });
        }
        return validators;
    }

    public getFormSection(sectionId: any): FormGroup {
        return this.rootForm.get(sectionId) as FormGroup;
    }

    public getFormSectionFiledGroup(sectionId: any): FormGroup {
        return this.getFormSection(sectionId).get('fields') as FormGroup;
    }

    public submit(value: any): void {
        console.log(value);
    }

}