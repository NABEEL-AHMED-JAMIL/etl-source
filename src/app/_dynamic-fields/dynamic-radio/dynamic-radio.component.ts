import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';

/**
 * Radio
 * */
/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'dynamic-radio',
    templateUrl: './dynamic-radio.component.html',
    styleUrls: ['./dynamic-radio.component.css']
})
export class DynamicRadioComponent extends DynamicFieldComponent implements OnInit {
 
    constructor() {
        super();
    }

    ngOnInit() {
    }

}