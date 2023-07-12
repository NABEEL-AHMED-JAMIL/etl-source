import { Component, OnInit } from '@angular/core';
import { ApiCode, IStaticTable, ITemplate,
  ActionType, SettingService } from '../../../../_shared';
import { CUTemplateComponent } from '../../../index';
import { AlertService, SpinnerService } from '../../../../_helpers';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';


@Component({
  selector: 'app-mg-template',
  templateUrl: './mg-template.component.html',
  styleUrls: ['./mg-template.component.css']
})
export class MgTemplateComponent implements OnInit {

  public templateDatas: ITemplate[] = [];
  public templateTable: IStaticTable = {
    tableId: 'template_id',
    title: 'Template',
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
      }
    ],
    dataColumn: [
      {
        field: 'templateId',
        header: 'Id',
        type: 'data'
      },
      {
        field: 'templateName',
        header: 'Name',
        type: 'data'
      },
      {
        field: 'templateType',
        header: 'Type',
        type: 'tag'
      },
      {
        field: 'status',
        header: 'Status',
        type: 'tag'
      },
      {
        field: 'dateCreated',
        header: 'Created',
        type: 'date'
      }
    ],
    actionType: [
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
    ]
  };

  constructor(
    private settingService: SettingService,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private drawerService: NzDrawerService,
    private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.fetchTemplateReg();
  }

  // fetch all lookup
  public fetchTemplateReg(): any {
    this.spinnerService.show();
    this.settingService.fetchTemplateReg({})
    .pipe(first())
    .subscribe((response: any) => {
      this.spinnerService.hide();
      if (response.status === ApiCode.ERROR) {
        this.alertService.showError(response.message, ApiCode.ERROR);
        return;
      }
      this.templateDatas = response.data;
      this.templateTable.dataSource = this.templateDatas;
    }, (error: any) => {
      this.spinnerService.hide();
      this.alertService.showError(error.message, ApiCode.ERROR);
    });
  }

  public deleteTemplate(payload: any): void {
    this.spinnerService.show();
    this.settingService.deleteTemplateReg(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.fetchTemplateReg();
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
      this.fetchTemplateReg();
    }
  }

  public tableActionReciver(payload: any) {
    if (ActionType.EDIT === payload.action) {
      this.openCuLookup(ActionType.EDIT, payload);
    } else if (ActionType.DELETE === payload.action) {
      this.modalService.confirm({
        nzTitle: 'Do you Want to delete these items?',
        nzContent: "Press 'Ok' may effect to send mail.",
        nzOnOk: () => {
          this.deleteTemplate({
            templateId: payload.data.templateId
          });
        }
      });
    }
  }

  public openCuLookup(actionType: ActionType, editPayload: any): void {
    this.drawerService.create({
      nzTitle: actionType === ActionType.ADD ? 'Add Template': 
        'Edit Template (' + editPayload.data.templateId + ')',
      nzSize: 'large',
      nzMaskClosable: false,
      nzContent: CUTemplateComponent,
      nzContentParams: {
        actionType: actionType,
        editPayload: editPayload?.data
      }
    });
  }

}
