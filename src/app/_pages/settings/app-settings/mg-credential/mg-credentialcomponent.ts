import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CUCredentialComponent } from '../../../index';
import { ApiCode, IStaticTable, ActionType,
  ICredentialList, CredentailService } from '../../../../_shared';
import { AlertService, SpinnerService } from '../../../../_helpers';
import { first } from 'rxjs';


@Component({
  selector: 'app-mg-credential',
  templateUrl: './mg-credential.component.html',
  styleUrls: ['./mg-credential.component.css']
})
export class MGCredentialComponent implements OnInit {

  public credentialDatas: ICredentialList[] = [];
  public credentialTable: IStaticTable = {
    tableId: 'credentail_id',
    title: 'Credentail',
    bordered: false,
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
        field: 'credentialId',
        header: 'Id',
        type: 'data'
      },
      {
        field: 'credentialName',
        header: 'Name',
        type: 'data'
      },
      {
        field: 'credentialType',
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
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private credentailService: CredentailService,
    private alertService: AlertService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.fetchAllCredential();
  }

  // fetch all lookup
  public fetchAllCredential(): any {
    this.spinnerService.show();
    this.credentailService.fetchAllCredential({})
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.credentialDatas = response.data;
        this.credentialTable.dataSource = this.credentialDatas;
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error.message, ApiCode.ERROR);
      });
  }

  public deleteCredentail(payload: any): void {
    this.spinnerService.show();
    this.credentailService.deleteCredential(payload)
      .pipe(first())
      .subscribe((response: any) => {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
          this.alertService.showError(response.message, ApiCode.ERROR);
          return;
        }
        this.fetchAllCredential();
        this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
      }, (error: any) => {
        this.spinnerService.hide();
        this.alertService.showError(error, ApiCode.ERROR);
      });
  }

  public buttonActionReciver(payload: any) {
    if (ActionType.ADD === payload.action) {
      this.openCuCredentail(ActionType.ADD, null);
    } else if (ActionType.RE_FRESH === payload.action) {
      this.fetchAllCredential();
    }
  }

  public tableActionReciver(payload: any) {
    if (ActionType.EDIT === payload.action) {
      this.openCuCredentail(ActionType.EDIT, payload);
    } else if (ActionType.DELETE === payload.action) {
      // delete only in parent side setting so no need to check
      this.modalService.confirm({
        nzTitle: 'Do you want to delete these lookup?',
        nzContent: "Press 'Ok' may effect the running source",
        nzOnOk: () => {
          this.deleteCredentail({ credentialId: payload.data.credentialId });
        }
      });
    }
  }

  public openCuCredentail(actionType: ActionType, editPayload: any): void {

    this.drawerService.create({
      nzTitle: actionType === ActionType.ADD ? 'Add Credentail': 'Edit Credentail (' + editPayload.data.credentialId + ')',
      nzSize: 'large',
      nzMaskClosable: false,
      nzContent: CUCredentialComponent,
      nzContentParams: {
        actionType: actionType,
        editPayload: editPayload?.data
      }
    });
  }

}
