import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';

/**
 * Text | Email | URL | Passwrod
 * */
/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'dynamic-input',
    templateUrl: './dynamic-input.component.html',
    styleUrls: ['./dynamic-input.component.css']
})
export class DynamicInputComponent extends DynamicFieldComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}