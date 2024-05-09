import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators
} from '@angular/forms';
import { DynamicFieldComponent } from '../dynmic-field';


@Component({
    selector: 'dynamic-key-value',
    templateUrl: './dynamic-key-value.component.html',
    styleUrls: ['./dynamic-key-value.component.css']
})
export class DynamicKeyValueComponent extends DynamicFieldComponent implements OnInit {

    public keyValueForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        super()
    }

    ngOnInit(): void {
        this.keyValueForm = this.fb.group({
            tagsInfo: this.fb.array([
                this.buildItem(),
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
        return this.keyValueForm.get('tagsInfo') as FormArray;
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

}