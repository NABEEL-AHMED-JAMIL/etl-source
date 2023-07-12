import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCode, ITemplate, ActionType, ILookupData, LOOKUP_TYPE, SettingService } from '../../../../../_shared';
import { AlertService, SpinnerService, StorageService } from '../../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-cu-template',
  templateUrl: './cu-template.component.html',
  styleUrls: ['./cu-template.component.css']
})
export class CUTemplateComponent implements OnInit {

  @Input()
  public actionType: ActionType;
	@Input()
	public editPayload: ITemplate;

  public loading: boolean = false;
  public templateForm: FormGroup;
  
  public emailTemplateLookup: ILookupData;
  public applicationStatusLookup: ILookupData;

  public EMAIL_TEMPLATE = LOOKUP_TYPE.EMAIL_TEMPLATE;
  public APPLICATION_STATUS = LOOKUP_TYPE.APPLICATION_STATUS;

	constructor(private formBuilder: FormBuilder,
		private alertService: AlertService,
		private spinnerService: SpinnerService,
		private settingService: SettingService,
    private storageService: StorageService) {
	}

  ngOnInit(): void {
    this.emailTemplateLookup = this.storageService.findLookupByParent(this.EMAIL_TEMPLATE);
    this.applicationStatusLookup = this.storageService.findLookupByParent(this.APPLICATION_STATUS);
    if (this.actionType === ActionType.ADD) {
      this.addTemplateForm();
    } else if (this.actionType === ActionType.EDIT) {
      this.editTemplateForm();
    }
  }

  public addTemplateForm(): any {
		this.spinnerService.show();
		this.templateForm = this.formBuilder.group({
			templateName: ['', Validators.required],
      templateType: ['', Validators.required],
      templateContent: ['', Validators.required]
    });
		this.spinnerService.hide();
	}

  public editTemplateForm(): void {
		this.spinnerService.show();
		this.templateForm = this.formBuilder.group({
			templateId: [this.editPayload.templateId, Validators.required],
      templateName: [this.editPayload.templateName, Validators.required],
			templateType: [this.editPayload.templateType?.lookupCode, Validators.required],
      templateContent: [this.editPayload.templateContent, Validators.required],
      status: [this.editPayload.status?.lookupCode, Validators.required]
    });
		this.spinnerService.hide();
	}

  public submit(): void {
		if (this.actionType === ActionType.ADD) {
      this.addTemplate();
		} else if (this.actionType === ActionType.EDIT) {
      this.updateTemplate();
		}
  }

  public addTemplate(): void {
		this.loading = true;
		this.spinnerService.show();
		if (this.templateForm.invalid) {
			this.spinnerService.hide();
			return;
		}
		let payload = {
      ...this.templateForm.value
    }
    this.settingService.addTemplateReg(payload)
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

	public updateTemplate(): void {
		this.loading = true;
		this.spinnerService.show();
		if (this.templateForm.invalid) {
			this.spinnerService.hide();
			return;
		}
		let payload = {
		  ...this.templateForm.value
    }
    this.settingService.editTemplateReg(payload)
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
	get template() {
		return this.templateForm.controls;
	}

}
