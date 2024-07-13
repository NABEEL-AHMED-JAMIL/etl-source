import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators
} from '@angular/forms';
import {
    AlertService,
    SpinnerService
} from '../../../../_helpers';
import {
    ApiCode,
    DynamicPayloadService
} from '../../../../_shared';
import { saveAs } from 'file-saver';
import { first } from 'rxjs';


@Component({
    selector: 'app-dynamic-payload',
    templateUrl: './dynamic-payload.component.html',
    styleUrls: ['./dynamic-payload.component.css']
})
export class DynamicPayloadQueryComponent implements OnInit {

    public switchValue:boolean = false;
    public visible:boolean = false;
    public loading:boolean = false;
    public dynamicString: any;
    public dynamicInfo: any;
    public dynamicForm!: FormGroup;

    constructor(private fb: FormBuilder,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private dynamicPayloadService: DynamicPayloadService) {
    }

    ngOnInit(): void {
        this.dynamicForm = this.fb.group({
            tagsInfo: this.fb.array([
                this.buildItem(), this.buildItem(), this.buildItem(),
                this.buildItem(), this.buildItem(), this.buildItem(),
                this.buildItem(), this.buildItem(), this.buildItem(),
                this.buildItem()
            ])
        });
    }

    public buildItem(): any {
        return new FormGroup({
            tagKey: new FormControl('', Validators.required),
            tagParent: new FormControl(''),
            tagValue: new FormControl('')
        });
    }

    public get tageForms(): FormArray {
        return this.dynamicForm.get('tagsInfo') as FormArray;
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

    public submintTageForms(dynamicInfo: any): void {
        this.spinnerService.show();
        this.loading = true;
        this.dynamicInfo = {
            [this.switchValue ? 'jsonTagsInfo' : 'xmlTagsInfo']: dynamicInfo?.tagsInfo
        }
        this.dynamicPayloadService.dynamicPaylaod(this.dynamicInfo, this.switchValue)
            .pipe(first())
            .subscribe((response: any) => {
                this.loading = false;
                debugger
                if (response.status === ApiCode.SUCCESS) {
                    this.dynamicString = response.message;
                    this.visible = true;
                    this.spinnerService.hide();
                } else {
                    this.spinnerService.hide();
                    this.alertService.showError(response.message, ApiCode.ERROR);
                }
            }, (response: any) => {
                this.loading = false;
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public createFile(): any {
        this.loading = true;
        const file = new Blob([this.dynamicString]);
        saveAs(file, 'ETL-Dynamic-Config ' + this.uuid() +  (this.switchValue ? '.json': '.xml'));
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