import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { LookupService, ApiCode } from '../../../_shared';
import { AlertService, SpinnerService } from '../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  @Input()
  public batchDetail: any;
  public action: any;
  public payload: any;
  public errors: any;

  public uploading: any = false;
  public fileList: NzUploadFile[] = [];


  constructor(
    private lookupService: LookupService,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private drawerRef: NzDrawerRef<any>) {}

  ngOnInit(): void {
    
  }

  /**
   * only 1 file allow
   */
  public beforeUpload = (file: NzUploadFile): boolean => {
    this.errors = [];
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  public handleUpload(): void {
    this.spinnerService.show();
    this.errors = [];
    this.uploading = true;
    debugger
    this.action = this.batchDetail.action;
    this.payload = this.batchDetail.data;
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    if (this.action === 'Lookup' || this.action === 'SubLookup') {
      let payload = {
        parentLookupId: this.action === 'SubLookup' ?  this.payload.parentLookupId : null
      }
      formData.append("data", JSON.stringify(payload));
      this.lookupService.uploadLookup(formData)
        .pipe(first())
        .subscribe((response: any) => {
          this.spinnerService.hide();
          this.uploading = false;
          if (response?.status === ApiCode.ERROR) {
            this.errors = response.data;
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
          }
          this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
        }, (error: any) => {
          this.spinnerService.hide();
          this.uploading = false;
          this.alertService.showError(error, ApiCode.ERROR);
        });
    }
  }

  public close(): void {
    this.drawerRef.close();
  }


}
