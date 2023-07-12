
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';

// npm install @kolkov/angular-editor --save
@NgModule({
  exports: [
    NzMenuModule,
    NzLayoutModule,
    NzDropDownModule,
    NzButtonModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzNotificationModule,
    NzDrawerModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzTagModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzPopconfirmModule,
    NzUploadModule,
    NzInputNumberModule,
    NzListModule,
    NzModalModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTabsModule,
    NzEmptyModule,
    NzSelectModule,
    NzCardModule
  ],
  providers:[
  ]
})
export class NgZorroAntdModule {

}
