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
    SpinnerService,
    StorageService
} from '../../_helpers';
import { UpdateProfileComponent } from 'src/app/_pages';
import { NzDrawerService } from 'ng-zorro-antd/drawer';


@Component({
    selector: 'app-user-action',
    templateUrl: './user-action.component.html',
    styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

    @Input()
    public currentUser: AuthResponse;

    constructor(private router: Router,
        private spinnerService: SpinnerService,
        private alertService: AlertService,
        private drawerService: NzDrawerService,
        private storageService: StorageService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    public logout(): any {
        this.spinnerService.show();
        this.authenticationService.logout()
            .pipe(first())
            .subscribe((data: any) => {
                this.spinnerService.hide();
                if (data.status === ApiCode.ERROR) {
                    this.alertService.showError(data.message, ApiCode.ERROR);
                    return;
                }
                this.storageService.clear();
                this.router.navigate(['/login']);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public viewProfile(): void {
        this.drawerService.create({
            nzTitle: 'Update Profile',
            nzWidth: 1000,
            nzSize: 'large',
            nzMaskClosable: false,
            nzContent: UpdateProfileComponent
        });

    }

}
