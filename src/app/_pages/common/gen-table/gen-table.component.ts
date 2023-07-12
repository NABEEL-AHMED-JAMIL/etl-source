import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { IStaticTable, ActionType } from '../../../_shared';


@Component({
  selector: 'app-gen-table',
  templateUrl: './gen-table.component.html',
  styleUrls: ['./gen-table.component.css']
})
export class GenTableComponent implements OnInit {

  public checked:boolean = false;
  public indeterminate:boolean = false;
  public setOfCheckedId = new Set<any>();
  public listOfCurrentPageData: readonly any[] = [];
  public searchDetails: any;

  @Input()
  public staticTable: IStaticTable;
  @Output()
  public actionEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output()
  public buttonEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  public onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) => this.updateCheckedSet(id, checked));
  }

  public onItemChecked(id: any, checked: boolean): void {
    debugger
    this.updateCheckedSet(id, checked);
  }

  public updateCheckedSet(id: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  public getDataFromObject(value: any) {
    if (value && typeof value == 'object') {
      return value?.lookupValue;      
    }
    return value;
  }

  public actionEvent(action: ActionType, payload: any) {
    let actionPayload = {
      action: action,
      data: payload
    };
    this.actionEventEmitter.emit(actionPayload);
  }

  public buttonEvent(action: ActionType) {
    this.buttonEventEmitter.emit({ action: action });
  }

}
