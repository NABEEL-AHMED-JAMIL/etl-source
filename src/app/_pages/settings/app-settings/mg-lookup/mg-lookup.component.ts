import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BatchComponent, CULookupComponent } from '../../../index';
import { LookupService, ApiCode, IStaticTable, ActionType, ILookupData } from '../../../../_shared';
import { AlertService, SpinnerService, CommomService } from '../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-mg-lookup',
  templateUrl: './mg-lookup.component.html',
  styleUrls: ['./mg-lookup.component.css']
})
export class MGLookupComponent implements OnInit {

  public isParent: boolean = false;
  public lookupId: any;
	public lookupAction: ActionType;
  public parentLookupDate: ILookupData;
  public lookupDatas: ILookupData[] = [];

  public lookupTable: IStaticTable = {
    tableId: 'lookup_id',
    title: 'Lookup',
    bordered: true,
    checkbox: false,
    size: 'small',
    headerButton: [
      {
        type:'plus-circle',
        color: 'balck',
        spin: false,
        action: ActionType.ADD
      },
      {
        type:'reload',
        color: 'balck',
        spin: false,
        action: ActionType.RE_FRESH
      },
      {
        type:'upload',
        color: 'balck',
        spin: false,
        action: ActionType.UPLOAD
      },
      {
        type:'download',
        color: 'balck',
        spin: false,
        action: ActionType.DOWNLOAD
      }
    ],
    dataColumn: [
      {
        field: 'lookupId',
        header: 'Id',
        type: 'data'
      },
      {
        field: 'lookupType',
        header: 'Lookup Type',
        type: 'data'
      },
      {
        field: 'lookupValue',
        header: 'Lookup Value',
        type: 'data'
      },
      {
        field: 'lookupCode',
        header: 'Code',
        type: 'data'
      },
      {
        field: 'uiLookup',
        header: 'UI Lookup',
        type: 'data'
      },
      {
        field: 'description',
        header: 'Detail',
        type: 'data'
      },
      {
        field: 'dateCreated',
        header: 'Created',
        type: 'date'
      }
    ]
  };

  constructor(private router: Router,
		private route: ActivatedRoute,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private lookupService: LookupService,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private commomService: CommomService) {
    this.route.data.subscribe((data: any) => {
      this.isParent = data.parent;
      if (!this.isParent) {
        this.route.queryParams.subscribe(params => {
          this.lookupId = params['lookupId'];
          this.fetchSubLookupByParentId(this.lookupId);
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.isParent) {
      this.fetchAllLookup();
    }
  }

  // fetch all lookup
  public fetchAllLookup(): any {
    this.spinnerService.show();
    this.lookupService.fetchAllLookup({})
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.lookupDatas = response.data;
        this.lookupTable.dataSource = response.data
        .map((data: any) => { 
          data.id = data.lookupId;
          data.uiLookup = data.uiLookup+"";
          data.uiLookup = data.uiLookup.toUpperCase();
          return data;
        });
        this.lookupTable.actionType = [
          {
            type:'edit',
            color: 'green',
            spin: false,
            action: ActionType.EDIT
          },
          {
            type:'plus-square',
            color: 'blue',
            spin: false,
            action: ActionType.SUBNODE
          }
        ];
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error.message, ApiCode.ERROR);
      });
  }

  public fetchSubLookupByParentId(parentLookUpId: any): void {
		this.spinnerService.show();
		this.lookupService.fetchSubLookupByParentId({ parentLookupId: parentLookUpId })
    .pipe(first())
		.subscribe((response: any) => {
      this.spinnerService.hide();
			if(response.status === ApiCode.ERROR) {
				this.alertService.showError(response?.message, ApiCode.ERROR);
        return;
			}
      // parent lookup date to show the parent detail
      this.parentLookupDate = response?.data?.parentLookupData;
      this.lookupDatas = response.data?.subLookupData;
      this.lookupTable.dataSource = this.lookupDatas
      .map((data: any) => { 
        data.id = data.lookupId;
        data.uiLookup = data.uiLookup+"";
        data.uiLookup = data.uiLookup.toUpperCase();
        return data;
      });
      this.lookupTable.actionType = [
        {
          type:'edit',
          color: 'green',
          spin: false,
          action: ActionType.EDIT
        },
        {
          type:'delete',
          color: 'red',
          spin: false,
          action: ActionType.DELETE
        }
      ];
		}, (error: any) => {
			this.spinnerService.hide();
			this.alertService.showError(error, ApiCode.ERROR);
		});
  }

  public downloadData(payload: any): void {
    this.spinnerService.show();
    this.lookupService.downloadLookup(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.commomService.downLoadFile(response);
        this.spinnerService.hide();
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

  public downloadTemplate(): void {
    this.spinnerService.show();
    this.lookupService.downloadLookupTemplateFile()
      .pipe(first())
      .subscribe((response: any) => {
        this.commomService.downLoadFile(response);
        this.spinnerService.hide();
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

  public deleteLookupData(payload: any): void {
    this.spinnerService.show();
    this.lookupService.deleteLookupData(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.fetchSubLookupByParentId(this.lookupId);
        // after delete reset the data
        this.lookupService.fetchCacheData();
        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

  public buttonActionReciver(payload: any) {
    if (ActionType.ADD === payload.action) {
      this.openCuLookup(ActionType.ADD, null);
    } else if (ActionType.RE_FRESH === payload.action) {
      if (this.isParent) {
        this.fetchAllLookup();
      } else {
        this.fetchSubLookupByParentId(this.lookupId);
      }
      // after delete reset the data
      this.lookupService.fetchCacheData();
    } else if (ActionType.DOWNLOAD === payload.action) {
      if (this.isParent) {
        this.downloadData({});
      } else {
        this.downloadData({ parentLookupId: this.lookupId });
      }
    } else if (ActionType.UPLOAD === payload.action) {
      if (this.isParent) {
        payload.action = 'Lookup'
      } else {
        payload.action = 'SubLookup',
        payload.data = {
          parentLookupId: this.lookupId
        }
      }
      this.openBatchTemplate(payload);
    }
  }

  public tableActionReciver(payload: any) {
    if (ActionType.EDIT === payload.action) {
      this.openCuLookup(ActionType.EDIT, payload);
    } else if (ActionType.SUBNODE === payload.action) {
      // sub node only in parent side setting so no need to check
      this.router.navigate(['/setting/mgSubLookup'],
      {
        queryParams: {
          lookupId: payload.data.lookupId
        }
      });
    } else if (ActionType.DELETE === payload.action) {
      // delete only in parent side setting so no need to check
      this.modalService.confirm({
        nzTitle: 'Do you want to delete these lookup?',
        nzContent: "Press 'Ok' may effect the running source",
        nzOnOk: () => {
          this.deleteLookupData({ lookupId: payload.data.lookupId });
        }
      });
    }
  }

  public openBatchTemplate(payload: any): void {
    this.drawerService.create({
      nzTitle: 'Batch Opertion',
      nzSize: 'default',
      nzMaskClosable: false,
      nzFooter: '<b>Note :- Add Xlsx File For Process, Once File Upload Successfully Click Refresh Button</b>',
      nzContent: BatchComponent,
      nzContentParams: {
        batchDetail: payload
      }
    });
  }

  public openCuLookup(actionType: ActionType, editPayload: any): void {
    this.drawerService.create({
      nzTitle: actionType === ActionType.ADD ? 'Add Lookup': 'Edit Lookup (' + editPayload.data.lookupType + ')',
      nzSize: 'large',
      nzMaskClosable: false,
      nzContent: CULookupComponent,
      nzContentParams: {
        actionType: actionType,
        parentLookupId: this.lookupId,
        editPayload: editPayload?.data
      }
    });
  }

}
