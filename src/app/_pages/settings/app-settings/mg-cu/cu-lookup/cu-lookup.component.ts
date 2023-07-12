import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService, ApiCode, ActionType, ILookupData } from '../../../../../_shared';
import { AlertService, SpinnerService } from '../../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-cu-lookup',
  templateUrl: './cu-lookup.component.html',
  styleUrls: ['./cu-lookup.component.css']
})
export class CULookupComponent implements OnInit {

  @Input()
  public actionType: ActionType;
  @Input()
	public parentLookupId: any;
	@Input()
	public editPayload: ILookupData;

	public loading: boolean = false;
  public lookupDataForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
		private alertService: AlertService,
		private spinnerService: SpinnerService,
		private lookupService: LookupService) {
	}

  ngOnInit(): void {
    if (this.actionType === ActionType.ADD) {
      this.addLookupForm();
    } else if (this.actionType === ActionType.EDIT) {
      this.editLookupForm();
    }
  }

  public addLookupForm(): any {
		this.spinnerService.show();
		this.lookupDataForm = this.formBuilder.group({
			lookupType: ['', Validators.required],
      lookupValue: ['', Validators.required],
      lookupCode: ['', Validators.required],
      description: [''],
			parentLookupId: [this.parentLookupId]
    });
		this.spinnerService.hide();
	}

  public editLookupForm(): void {
		this.spinnerService.show();
		this.lookupDataForm = this.formBuilder.group({
			lookupId: [this.editPayload.lookupId, Validators.required],
      lookupType: [this.editPayload.lookupType, Validators.required],
			lookupValue: [this.editPayload.lookupValue, Validators.required],
      lookupCode: [this.editPayload.lookupCode, Validators.required],
      description: [this.editPayload.description],
			parentLookupId: [this.parentLookupId]
    });
		this.spinnerService.hide();
	}

  public submit(): void {
		if (this.actionType === ActionType.ADD) {
      this.addLookupData();
		} else if (this.actionType === ActionType.EDIT) {
      this.updateLookupData();
		}
  }

  public addLookupData(): void {
		this.loading = true;
		this.spinnerService.show();
		if (this.lookupDataForm.invalid) {
			this.spinnerService.hide();
			return;
		}
		let payload = {
      ...this.lookupDataForm.value
    }
    this.lookupService.addLookupData(payload)
    .pipe(first())
    .subscribe((response: any) => {
      this.loading = false;
      this.spinnerService.hide();
      if(response.status === ApiCode.ERROR) {
        this.alertService.showError(response.message, ApiCode.ERROR);
        return;
      }
      this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
    }, (error: any) => {
      this.loading = false;
      this.spinnerService.hide();
      this.alertService.showError(error, ApiCode.ERROR);
    });
	}

	public updateLookupData(): void {
		this.loading = true;
		this.spinnerService.show();
		if (this.lookupDataForm.invalid) {
			this.spinnerService.hide();
			return;
		}
		let payload = {
		  ...this.lookupDataForm.value
    }
    this.lookupService.updateLookupData(payload)
    .pipe(first())
    .subscribe((response: any) => {
      this.loading = false;
      this.spinnerService.hide();
      if(response.status === ApiCode.ERROR) {
        this.alertService.showError(response.message, ApiCode.ERROR);
        return;
      }
      this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
    }, (error: any) => {
      this.loading = false;
      this.spinnerService.hide();
      this.alertService.showError(error, ApiCode.ERROR);
    });
	}

	// convenience getter for easy access to form fields
	get lookupData() {
		return this.lookupDataForm.controls;
	}

}
