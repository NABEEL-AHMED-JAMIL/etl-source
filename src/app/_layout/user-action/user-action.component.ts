import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCode, AuthResponse, AuthenticationService } from '../../_shared';
import { AlertService, SpinnerService, StorageService } from '../../_helpers';
import { first } from 'rxjs/operators';


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

}
