import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertService, SpinnerService, CommomService } from '../../../_helpers';
import { SettingService, ApiCode } from '../../../_shared';

@Component({
  selector: 'app-db-query',
  templateUrl: './db-query.component.html',
  styleUrls: ['./db-query.component.css']
})
export class DBQueryComponent implements OnInit {

  public searchDetails: any;
  public tableQueryForm!: UntypedFormGroup;
  public queryResponse: any;
  public disabledSearch: boolean = false;
  public isSearchLoading: boolean = false;
  public isExportLoading: boolean = false;

  constructor(private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private settingService: SettingService,
    private commomService: CommomService) {
  }

  ngOnInit(): void {
    this.tableQueryFormInit();
  }

  public tableQueryFormInit(): any {
    this.spinnerService.show();
    this.tableQueryForm = this.fb.group({
      query: ['', Validators.required]
    });
    this.spinnerService.hide();
  }

  public clear(): any {
    this.spinnerService.show();
    this.disabledSearch = false;
    this.queryResponse = undefined;
    this.spinnerService.hide();
  }

  public dynamicQueryResponse(): void {
    this.isSearchLoading = true;
    if (this.tableQueryForm.valid) {
      this.spinnerService.show();
      this.settingService.dynamicQueryResponse(this.tableQueryForm.value)
      .pipe(first())
      .subscribe((response: any) => {
        this.isSearchLoading = false;
        this.disabledSearch = true;
        if(response.status === ApiCode.SUCCESS) {
          this.queryResponse = response.data;
          this.spinnerService.hide();
        } else {
          this.spinnerService.hide();
          this.alertService.showError(response.message, ApiCode.ERROR);
        }
      }, (error: any) => {
        this.isSearchLoading = false;
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
    } else {
      this.isSearchLoading = false;
      Object.values(this.tableQueryForm.controls)
      .forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  public exportExcel(): void {
    this.isExportLoading = true;
    this.spinnerService.show();
    this.settingService.downloadDynamicQueryFile(this.tableQueryForm.value)
      .pipe(first())
      .subscribe((response: any) => {
        this.isExportLoading = false;
        this.spinnerService.hide();
        this.commomService.downLoadFile(response);
      }, (error: any) => {
        this.isExportLoading = false;
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

}
