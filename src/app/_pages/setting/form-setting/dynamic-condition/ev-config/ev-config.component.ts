import { Component, OnInit } from '@angular/core';
import { AuthResponse, IStaticTable, ActionType } from 'src/app/_shared';


@Component({
    selector: 'app-ev-config',
    templateUrl: './ev-config.component.html',
    styleUrls: ['./ev-config.component.css']
})
export class EVConfigComponent implements OnInit {

    public setOfVisibilityCheckedId = new Set<any>();
    public setOfEnableCheckedId = new Set<any>();

    public sessionUser: AuthResponse;
    public visibilityTable: IStaticTable = {
        tableId: 'visibility_id',
        title: 'Mg Visibility',
        bordered: true,
        checkbox: true,
        size: 'small',
        headerButton: [
            {
                type: 'plus-circle',
                color: 'red',
                spin: false,
                tooltipTitle: 'Add',
                action: ActionType.ADD
            },
            {
                type: 'reload',
                color: 'red',
                spin: false,
                tooltipTitle: 'Refresh',
                action: ActionType.RE_FRESH
            }
        ],
        extraHeaderButton: [
            {
                title: 'Delete All',
                type: 'delete',
                action: ActionType.DELETE
            }
        ],
        dataColumn: [
            {
                field: 'name',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
                type: 'data'
            },
            {
                field: 'dateCreated',
                header: 'Created',
                type: 'date'
            },
            {
                field: 'createdBy',
                header: 'Created By',
                type: 'combine',
                subfield: ['id', 'username']
            },
            {
                field: 'dateUpdated',
                header: 'Updated',
                type: 'date'
            },
            {
                field: 'updatedBy',
                header: 'Updated By',
                type: 'combine',
                subfield: ['id', 'username']
            },
            {
                field: 'status',
                header: 'Status',
                type: 'tag'
            }
        ],
        actionType: [
            {
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            // {
            //     type: 'link',
            //     color: 'orange',
            //     spin: false,
            //     tooltipTitle: 'Link With User',
            //     action: ActionType.LINK
            // },
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };
    public enableAbilityTable: IStaticTable = {
        tableId: 'role_id',
        title: 'Mg Enable',
        bordered: true,
        checkbox: true,
        size: 'small',
        headerButton: [
            {
                type: 'plus-circle',
                color: 'red',
                spin: false,
                tooltipTitle: 'Add',
                action: ActionType.ADD
            },
            {
                type: 'reload',
                color: 'red',
                spin: false,
                tooltipTitle: 'Refresh',
                action: ActionType.RE_FRESH
            }
        ],
        extraHeaderButton: [
            {
                title: 'Delete All',
                type: 'delete',
                action: ActionType.DELETE
            }
        ],
        dataColumn: [
            {
                field: 'name',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
                type: 'data'
            },
            {
                field: 'dateCreated',
                header: 'Created',
                type: 'date'
            },
            {
                field: 'createdBy',
                header: 'Created By',
                type: 'combine',
                subfield: ['id', 'username']
            },
            {
                field: 'dateUpdated',
                header: 'Updated',
                type: 'date'
            },
            {
                field: 'updatedBy',
                header: 'Updated By',
                type: 'combine',
                subfield: ['id', 'username']
            },
            {
                field: 'status',
                header: 'Status',
                type: 'tag'
            }
        ],
        actionType: [
            {
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            // {
            //     type: 'link',
            //     color: 'orange',
            //     spin: false,
            //     tooltipTitle: 'Link With User',
            //     action: ActionType.LINK
            // },
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    constructor() {

    }

    ngOnInit(): void {
    }

    public buttonVisibilityActionReciver(payload: any): void {
    }

    public tableVisibilityActionReciver(payload: any): void {
    }

    public extraVisibilityActionReciver(payload: any): void {

    }

    public buttonEnableActionReciver(payload: any): void {
    }

    public tableEnableActionReciver(payload: any): void {
    }

    public extraEnableActionReciver(payload: any): void {

    }

}
