import { Component, Input, OnInit } from '@angular/core';
import {
    AuthResponse,
} from '../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-more-action',
    templateUrl: './more-action.component.html',
    styleUrls: ['./more-action.component.css']
})
// TODO: Implement more action base on user permissions
export class MoreActionComponent implements OnInit {

    @Input()
    public sessionUser: AuthResponse;

    constructor() {
    }

    ngOnInit(): void {
    }

}
