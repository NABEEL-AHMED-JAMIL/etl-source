import { Component, Input, OnInit } from '@angular/core';
import { CommomService } from 'src/app/_helpers';
import { AuthResponse } from 'src/app/_shared';


@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

    @Input()
    public userInfo: AuthResponse;

    constructor(public commomService: CommomService,) {
    }

    ngOnInit(): void {
       
    }


   

}