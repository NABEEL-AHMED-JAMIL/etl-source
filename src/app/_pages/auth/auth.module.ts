import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
// module
import { CommonModule } from '@angular/common';
import {
    NgZorroAntdModule
} from '../../_helpers';
// conponent
import {
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ResetPassComponent,
    AuthRoutingModule
} from './index';

/**
 * @author Nabeel Ahmed
 */
@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPassComponent,
        ResetPassComponent
    ],
})
export class AuthModule { }