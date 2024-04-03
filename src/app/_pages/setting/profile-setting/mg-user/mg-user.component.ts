import { Component, OnInit } from '@angular/core';
import { ActionType, AuthResponse, IStaticTable } from 'src/app/_shared';


@Component({
    selector: 'app-mg-user',
    templateUrl: './mg-user.component.html',
    styleUrls: ['./mg-user.component.css']
})
export class MgUserComponent implements OnInit {

    public sessionUser: AuthResponse;
    public userTable: IStaticTable = {
        tableId: 'user_id',
        title: 'Mg User',
        bordered: true,
        checkbox: false,
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
            },
            {
                type: 'upload',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Upload',
                action: ActionType.UPLOAD
            },
            {
                type: 'download',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Download',
                action: ActionType.DOWNLOAD
            }
        ],
        dataColumn: [
            {
                field: 'fullName',
                header: 'User Name',
                type: 'combine',
                subfield: ['firstName' , 'lastName']
            },
            {
                field: 'email',
                header: 'Email',
                type: 'data'
            },
            {
                field: 'username',
                header: 'Username',
                type: 'data'
            },
            {
                field: 'ipAddress',
                header: 'Ip Address',
                type: 'data'
            },
            {
                field: 'img',
                header: 'Image',
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
                subfield: ['id' , 'username']
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
                subfield: ['id' , 'username']
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
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            },
            {
                type: 'link',
                color: 'rgba(0, 0, 0, 0.85)',
                spin: false,
                tooltipTitle: 'Link With Group',
                action: ActionType.LINK
            }
        ]
    };


    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonActionReciver(payload: any): void {}

    public tableActionReciver(payload: any): void {}

}
