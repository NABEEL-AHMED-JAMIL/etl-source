import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService
} from '../../_shared';
import {
    AlertService,
    StorageService
} from '../../_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-user-action',
    templateUrl: './user-action.component.html',
    styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

    @Input()
    public sessionUser: AuthResponse;

    constructor(private router: Router,
        private alertService: AlertService,
        private storageService: StorageService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    public logout(): any {
        this.authenticationService.logout().pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.storageService.clear();
                    this.router.navigate(['/login']);
                }
        ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
