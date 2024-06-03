import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { SpinnerService } from 'src/app/_helpers';
import { ActionType,
    ISCVisibility
 } from 'src/app/_shared';


@Component({
    selector: 'app-sc-visibility',
    templateUrl: './sc-visibility.component.html',
    styleUrls: ['./sc-visibility.component.css']
})
export class SCVisibilityComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISCVisibility;
    
    public visibilityForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private drawerRef: NzDrawerRef<void>,
        private spinnerService: SpinnerService,) {
    }

    ngOnInit(): void {
        if (this.actionType === ActionType.ADD) {
            this.addForm();
        } else if (this.actionType === ActionType.EDIT) {
            this.editForm();
        }
    }

    public addForm(): any {
        this.spinnerService.show();
        this.visibilityForm = this.fb.group({
        });
        this.spinnerService.hide();
    }

    public editForm(): void {
        this.spinnerService.show();
        this.visibilityForm = this.fb.group({
        });
        this.spinnerService.hide();
    }

    /**
     * We will send back to the view and bind with view
     **/
    public onSubmit(): void {
    }

}