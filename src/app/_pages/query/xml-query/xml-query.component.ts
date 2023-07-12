import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AlertService, SpinnerService, CommomService } from '../../../_helpers';
import { SettingService, ApiCode } from '../../../_shared';
import { saveAs } from 'file-saver';
import { first } from 'rxjs';


@Component({
  selector: 'app-xml-query',
  templateUrl: './xml-query.component.html',
  styleUrls: ['./xml-query.component.css']
})
export class XMLQueryComponent implements OnInit {

  public visible = false;
  public loading: any = false;
  public xmlString: any;
  public xmlInfo: any;
  public xmlForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private settingService: SettingService,
    private commomService: CommomService) {
  }

  ngOnInit(): void {
    this.xmlForm = this.fb.group({
      tagsInfo: this.fb.array([
        this.buildItem(),
        this.buildItem()
      ]),
    });
  }

  public buildItem(): any {
    return new FormGroup({
      tagKey: new FormControl('', Validators.required),
      tagParent: new FormControl(''),
      tagValue: new FormControl(''),
    });
  }

  public get tageForms(): FormArray {
    return this.xmlForm.get('tagsInfo') as FormArray;
  }

  public tageFormsAddItem(): void {
    this.tageForms.push(this.buildItem());
  }

  public tageFormAddItem(index: number): void {
    this.tageForms.insert(index, this.buildItem());
  }

  public tageFormRemoveItem(index: number): void {
    this.tageForms.removeAt(index);
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  public submintTageForms(xmlInfo: any): void {
    this.spinnerService.show();
    this.loading = true;
    this.xmlInfo = {
      xmlTagsInfo: xmlInfo?.tagsInfo
    }
    this.settingService.getXmlData(this.xmlInfo)
      .pipe(first())
      .subscribe((response: any) => {
        this.loading = false;
        if (response.status === ApiCode.SUCCESS) {
          this.xmlString = response.message;
          this.visible = true;
          this.spinnerService.hide();
        } else {
          this.spinnerService.hide();
          this.alertService.showError(response.message, 'Error');
        }
      }, (error: any) => {
        this.loading = false;
        this.spinnerService.hide();
        this.alertService.showError(error, 'Error');
      });
  }

  public createFile(): any {
    this.loading = true;
    const file = new Blob([this.xmlString], { type: 'application/xml' });
    saveAs(file, 'ETL-XML-Config ' + this.uuid() + '.xml');
    this.loading = false;
  }

  public uuid(): string {
    return 'xxxxxxxx-xxxxxx'.replace(/[xy]/g, (char) => {
      let random = Math.random() * 16 | 0;
      let value = char === "x" ? random : (random % 4 + 8);
      return value.toString(16);
    });
  }

}
