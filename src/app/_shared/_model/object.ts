import { NzTableSize } from 'ng-zorro-antd/table';

export enum ROLE {
    ROLE_MASTER_ADMIN = 1000,
    ROLE_ADMIN = 1001,
    ROLE_USER = 1002
}

export interface IAppUser {
    appUserId?: any;
    profile?: any;
    firstName?: any;
    lastName?: any;
    username?: any;
    email?: any;
    roleResponse?: any;
    status?: any;
    dateCreated?: any;
    subAppUser?: IAppUser[];
}

export interface SideBar {
    name: string;
    icon?: string;
    link?: string;
    roles?: any[];
    childLinks?: SideBar[];
}

export interface ApiResponse {
    status: ApiCode;	    
    message: any;	    
    data: any;
    paging: any;
}

export interface AuthResponse {
    appUserId: any;
    token: any;
    type: any;
    refreshToken: any;
    ipAddress: any;
    username: any;
    email: any;
    roles: any;
    profileImage?: any;
}

export interface IValueOption<T> {
    lookupType: string;
    lookupCode: T;
    lookupValue: string;
    color?: any;
}

export interface ICredential {
    credentialId: any;
    credentialName: any;
    credentialType: any,
    credentialContent: any;
    status: any,
    dateCreated: any;
}

export interface ICredentialList {
    credentialId: any;
    credentialName: any;
    credentialType: any,
    status: any,
    dateCreated: any;
}

export interface ILookupData {
    lookupId?: any;
    lookupType?: any;
    lookupValue?: any,
    lookupCode?: any;
    description?: any,
    dateCreated?: any;
    uiLookup?: any;
    parent?: ILookupData;
    lookupChildren?: ILookupData[];
}

export interface ITemplate {
    templateId: any;
    templateName: any;
    templateType: any;
    templateContent: any;
    status: any;
    dateCreated: any;
}

export interface IStaticTable {
    tableId: any;
    title?: any;
    bordered?: boolean,
    checkbox?: boolean,
    size?: NzTableSize,
    dataSource?: any;
    dataColumn?: ICol[];
    actionType?: any; // delete,update,subnode,more->dropdown
    headerButton?: any;
}

export interface ICol {
    field: any;
    header: any;
    type: any;
    subfield?: any;
    color?: any;
}

export interface INotifaction {
    title: any;
    data?: any;
    avatar: any;
    status?: any,
    statusType?: any
}

export enum ApiCode {
    SUCCESS = 'SUCCESS',
    INVALID_REQUEST = 'INVALID_REQUEST',
    ALREADY_CONSUMED = 'ALREADY_CONSUMED',
    ERROR = 'ERROR',	
    DELETED = 'DELETED',	
    HTTP_400 = 'HTTP_400',	
    HTTP_500 = 'HTTP_500',	
    HTTP_404 = 'HTTP_404'	
}

// delete,update,subnode,more->dropdown
export enum ActionType {
    DELETE = 0,
    EDIT = 1,
    SUBNODE = 2,
    MORE = 4,
    ADD = 5,
    RE_FRESH = 6,
    UPLOAD = 7,
    DOWNLOAD = 8,
    VIEW = 9
}

export enum DataType {
    DATA, DATE, TAG
}

export enum CREDENTIAL_TYPE {
    BASIC_AUTH = 0,
    CERTIFICATE = 1,
    AUTHORIZATION_CODE = 2,
    AWS_AUTH = 3,
    FIREBASE = 4,
    FTP = 5
}

export enum STATUS_TYPE {
    ACTIVE = 'green',
    DELETE = 'red',
    INACTIVE = 'yellow'
}

export const SETTING_SIDEBAR: SideBar[] = [
    {
        name: 'Source Setting',
        icon: 'form',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        childLinks: [
            {
                name: 'Source Task',
                icon: 'sketch',
                link: '/setting/mgSourceTask',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            },
            {
                name: 'Source Task Type',
                icon: 'dropbox',
                link: '/setting/mgSourceTaskType',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            }
        ]
    },
    {
        name: 'Form Setting',
        icon: 'database',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        childLinks: [
            {
                name: 'Manage Form',
                icon: 'form',
                link: '/setting/mgForm',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            },
            {
                name: 'Manage Section',
                icon: 'form',
                link: '/setting/mgSection',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            },
            {
                name: 'Manage Control',
                icon: 'form',
                link: '/setting/mgControl',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            }
        ]
    },
    {
        name: 'App Setting',
        icon: 'setting',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        childLinks: [
            {
                name: 'Manage Credential',
                icon: 'key',
                link: '/setting/mgCredential',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
            },
            {
                name: 'Manage Lookup',
                icon: 'control',
                link: '/setting/mgLookup',
                roles: ['ROLE_MASTER_ADMIN'],
            },
            {
                name: 'Manage Template',
                icon: 'mail',
                link: '/setting/mgTemplate',
                roles: ['ROLE_MASTER_ADMIN'],
            }
        ]
    },
    {
        name: 'Profile Setting',
        icon: 'user',
        roles: ['ROLE_MASTER_ADMIN'],
        childLinks: [
            {
                name: 'Manage User',
                icon: 'usergroup-add',
                link: '/setting/mgUsers',
                roles: ['ROLE_MASTER_ADMIN'],
            }
        ]
    }
];

export const LOOKUP_DATA: ILookupData[] = [
    {
        lookupId: 1116,
        lookupType: "URL_VALIDATOR",
        lookupValue: "^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$",
        description: "URL Validator",
        dateCreated: "2023-04-09T23:27:54.438+00:00"
    },
    {
        lookupId: 1043,
        lookupType: "UPLOAD_LIMIT",
        lookupValue: "5000",
        description: "upload limit max 5000",
        dateCreated: "2023-04-06T00:27:29.556+00:00"
    },
    {
        lookupId: 1009,
        lookupType: "SUPER_ADMIN",
        lookupValue: "super_admin93",
        description: "Super admin username detail",
        dateCreated: "2023-03-31T20:24:02.503+00:00"
    },
    {
        lookupId: 1044,
        lookupType: "DOWNLOAD_LIMIT",
        lookupValue: "5000",
        description: "download content limit 5000",
        dateCreated: "2023-04-06T00:28:10.205+00:00"
    },
    {
        lookupId: 1004,
        lookupType: "RESET_PASSWORD_LINK",
        lookupValue: "http://localhost:8080/resetpass",
        description: "Reset password link for send the email\n",
        dateCreated: "2023-03-27T21:16:52.389+00:00"
    },
    {
        lookupId: 1002,
        lookupType: "EMAIL_SENDER",
        lookupValue: "jakartato@example.com",
        description: "Email sender for send the email\n",
        dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
        lookupId: 1001,
        lookupType: "SCHEDULER_LAST_RUN_TIME",
        lookupValue: "2023-03-26 21:37:25.525 +0300",
        description: "Scheduler last run time for the scheduler",
        dateCreated: "2023-03-27T01:38:05.635+00:00"
    },
    {
        lookupId: 1000,
        lookupType: "QUEUE_FETCH_LIMIT",
        lookupValue: "500",
        description: "Queue fetch limit",
        dateCreated: "2023-03-27T01:36:25.433+00:00"
    },
    {
        lookupId: 1129,
        lookupType: "REQUEST_METHOD",
        lookupValue: "Select Request Type",
        description: "Select Request Type",
        dateCreated: "2023-04-16T02:02:04.333+00:00"
    },
    {
        lookupId: 1090,
        lookupType: "FORM_CONTROL_TYPE",
        lookupValue: "Select Form Control",
        description: "Select Form Control",
        dateCreated: "2023-04-07T03:22:58.009+00:00"
    },
    {
        lookupId: 1119,
        lookupType: "APPLICATION_STATUS",
        lookupValue: "Select Status",
        description: "Select Status",
        dateCreated: "2023-04-11T23:40:10.318+00:00"
    },
    {
        lookupId: 1123,
        lookupType: "TASKTYPE_OPTION",
        lookupValue: "Select TaskType",
        description: "Select TaskType",
        dateCreated: "2023-04-14T04:53:26.813+00:00"
    },
    {
        lookupId: 1005,
        lookupType: "SCHEDULER_TIMEZONE",
        lookupValue: "Scheduler TimeZone",
        description: "Scheduler TimeZone",
        dateCreated: "2023-03-31T18:50:03.669+00:00"
    },
    {
        lookupId: 1148,
        lookupType: "AGE_GROUP",
        lookupValue: "Select Age Group",
        description: "Age Group",
        dateCreated: "2023-04-23T11:52:44.534+00:00"
    },
    {
        lookupId: 1145,
        lookupType: "GENDER",
        lookupValue: "Select Gender",
        description: "Select Gender",
        dateCreated: "2023-04-23T11:51:19.390+00:00"
    },
    {
        lookupId: 1201,
        lookupType: "FORM_TYPE",
        lookupValue: "Select Form Type",
        description: "Select Form Type",
        dateCreated: "2023-05-10T16:40:15.656+00:00"
    },
    {
        lookupId: 1135,
        lookupType: "ISDEFAULT",
        lookupValue: "Select Default",
        description: "Select Default",
        dateCreated: "2023-04-17T05:26:09.964+00:00"
    },
    {
        lookupId: 1205,
        lookupType: "SCRAPING_FILE_TYPE",
        lookupValue: "Select File Type",
        description: "Select File Type",
        dateCreated: "2023-05-17T19:58:44.181+00:00"
    },
    {
        lookupId: 1212,
        lookupType: "SCRAPING_TYPE",
        lookupValue: "Select Scraping Type",
        description: "Select Scraping Type",
        dateCreated: "2023-05-18T11:52:37.671+00:00"
    },
    {
        lookupId: 1221,
        lookupType: "CREDENTIAL_TYPE",
        lookupValue: "Select Credential Type",
        description: "Select Credential Type",
        dateCreated: "2023-05-23T00:33:33.644+00:00"
    },
    {
        lookupId: 1215,
        lookupType: "HOME_PAGE",
        lookupValue: "Select Home Page",
        description: "Select Home Page",
        dateCreated: "2023-05-18T13:12:45.295+00:00"
    },
    {
        lookupId: 1128,
        lookupType: "STT_SIDEBAR",
        lookupValue: "[{\"type\":1,\"title\":\"STT\",\"router\":\"/stt\",\"active\":false},{\"type\":2,\"title\":\"STT Form\",\"router\":\"/sttf\",\"active\":false},{\"type\":3,\"title\":\"STT Section\",\"router\":\"/stts\",\"active\":false},{\"type\":4,\"router\":\"/sttc\",\"title\":\"STT Control\",\"active\":false}]",
        description: "STTSidebar Menu Detail",
        dateCreated: "2023-04-15T05:12:43.294+00:00"
    }
];

export const LOOKUP_DATA_TABLE: IStaticTable = {
    tableId: 'lookup_id',
    title: 'Lookup',
    bordered: true,
    checkbox: true,
    size: 'small',
    dataSource: [],
    dataColumn: [
        {
            field: 'lookupId',
            header: 'Id',
            type: 'data'
        },
        {
            field: 'lookupType',
            header: 'Lookup Type',
            type: 'data'
        },
        {
            field: 'lookupValue',
            header: 'Lookup Value',
            type: 'data',
        },
        {
            field: 'description',
            header: 'Detail',
            type: 'data'
        },
        {
            field: 'dateCreated',
            header: 'Created',
            type: 'date'
        }
    ],
    actionType: [
        {
            type: 'edit',
            action: ActionType.EDIT
        },
        {
            type: 'delete',
            action: ActionType.DELETE
        },
        {
            type: 'plus-square',
            action: ActionType.EDIT
        }
    ]
}
  
export const CREDENTAIL_DATA: ICredentialList[] = [
    {
        credentialId: 1120,
        credentialName: "Loop Basic Auth",
        credentialType: {
            lookupType: "BASIC_AUTH",
            lookupCode: 0,
            lookupValue: "BASIC AUTH",
            color: CREDENTIAL_TYPE.BASIC_AUTH
        },
        status: {
            lookupType: "ACTIVE",
            lookupCode: 1,
            lookupValue: "Active",
            color: STATUS_TYPE.ACTIVE
        },
        dateCreated: "2023-05-24T17:57:59.405+00:00"
    },
    {
        credentialId: 1122,
        credentialName: "AWS (WEB SCRAPPING)",
        credentialType: {
            lookupType: "AWS_AUTH",
            lookupCode: 3,
            lookupValue: "AWS AUTH",
            color: CREDENTIAL_TYPE.AWS_AUTH
        },
        status: {
            lookupType: "INACTIVE",
            lookupCode: 1,
            lookupValue: "Inactive",
            color: STATUS_TYPE.INACTIVE
        },
        dateCreated: "2023-05-24T22:46:23.715+00:00"
    },
    {
        credentialId: 1121,
        credentialName: "Loop AWS Auth",
        credentialType: {
            lookupType: "AWS_AUTH",
            lookupCode: 3,
            lookupValue: "AWS AUTH",
            color: CREDENTIAL_TYPE.AWS_AUTH
        },
        status: {
            lookupType: "DELETE",
            lookupCode: 2,
            lookupValue: "Delete",
            color: STATUS_TYPE.DELETE
        },
        dateCreated: "2023-05-24T17:59:24.719+00:00"
    }
]

export const CREDENTAIL_TABLE: IStaticTable = {
    tableId: 'credentail_id',
    title: 'Credential',
    bordered: true,
    checkbox: true,
    size: 'small',
    dataSource: CREDENTAIL_DATA,
    dataColumn: [
        {
            field: 'credentialId',
            header: 'Id',
            type: 'data'
        },
        {
            field: 'credentialName',
            header: 'Name',
            type: 'data'
        },
        {
            field: 'credentialType',
            header: 'Type',
            type: 'tag',
        },
        {
            field: 'status',
            header: 'Status',
            type: 'tag'
        },
        {
            field: 'dateCreated',
            header: 'Created',
            type: 'date'
        }
    ],
    actionType: [
        {
            type: 'edit',
            action: ActionType.EDIT
        },
        {
            type: 'delete',
            action: ActionType.DELETE
        },
        {
            type: 'plus-square',
            action: ActionType.EDIT
        }
    ]
}

export const TEMPLATE_DATA: ITemplate[] = [
    {
      templateId: 1004,
      templateName: "FORGOT_PASS",
      templateType: "FORGOT_PASS",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <style>\r\n      table {\r\n        font-family: arial, sans-serif;\r\n        border-collapse: collapse;\r\n        width: 100%;\r\n      }\r\n      td,\r\n      th {\r\n        border: 1px solid #dddddd;\r\n        text-align: left;\r\n        padding: 8px;\r\n      }\r\n      tr:nth-child(even) {\r\n        background-color: #dddddd;\r\n      }\r\n    </style>\r\n  </head>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>Please check below link to reset your password.</p>\r\n\r\n    <table>\r\n      <tr>\r\n        <th>Type</th>\r\n        <th>Detail</th>\r\n      </tr>\r\n      <tr>\r\n         <td>Username</td>\r\n         <td>${request.username}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Login Page</td>\r\n        <td><a href=\"${request.forgotPasswordPageUrl}\">Click Me.</a></td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.ACTIVE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
      templateId: 1003,
      templateName: "UPDATE_ACCOUNT_PROFILE",
      templateType: "UPDATE_ACCOUNT_PROFILE",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <style>\r\n      table {\r\n        font-family: arial, sans-serif;\r\n        border-collapse: collapse;\r\n        width: 100%;\r\n      }\r\n      td,\r\n      th {\r\n        border: 1px solid #dddddd;\r\n        text-align: left;\r\n        padding: 8px;\r\n      }\r\n      tr:nth-child(even) {\r\n        background-color: #dddddd;\r\n      }\r\n    </style>\r\n  </head>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>You have successfully updated your profile.</p>\r\n    <table>\r\n      <tr>\r\n        <th>Type</th>\r\n        <th>Detail</th>\r\n      </tr>\r\n      <tr>\r\n        <td>Username</td>\r\n        <td>${request.username}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>FirstName</td>\r\n        <td>${request.firstName}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>LastName</td>\r\n        <td>${request.lastName}</td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.ACTIVE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
      templateId: 1001,
      templateName: "CHANGE_ACCOUNT_TIMEZONE",
      templateType: "CHANGE_ACCOUNT_TIMEZONE",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>you have change your account timezone, reset of your\r\n        scheduler will (run,update) base on new timezone.</p>\r\n    <table>\r\n      <tr>\r\n        <th>Type</th>\r\n        <th>Detail</th>\r\n      </tr>\r\n      <tr>\r\n        <td>Username</td>\r\n        <td>${request.username}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Scheduler TimeZone</td>\r\n        <td>${request.timeZone}</td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.ACTIVE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
      templateId: 1000,
      templateName: "CLOSE_ACCOUNT",
      templateType: "CLOSE_ACCOUNT",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>you have successfully close your account.</p>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.ACTIVE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
      templateId: 1002,
      templateName: "RESET_PASS",
      templateType: "RESET_PASS",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>You have successfully reset your account. Login to access your account.</p>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.ACTIVE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    },
    {
      templateId: 1005,
      templateName: "REGISTER_USER",
      templateType: "REGISTER_USER",
      templateContent: "<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <style>\r\n      table {\r\n        font-family: arial, sans-serif;\r\n        border-collapse: collapse;\r\n        width: 100%;\r\n      }\r\n      td,\r\n      th {\r\n        border: 1px solid #dddddd;\r\n        text-align: left;\r\n        padding: 8px;\r\n      }\r\n      tr:nth-child(even) {\r\n        background-color: #dddddd;\r\n      }\r\n    </style>\r\n  </head>\r\n  <body>\r\n    <h2>Dear User,</h2>\r\n    <p>You have successfully register your account please check below detail for your account.</p>\r\n    <table>\r\n      <tr>\r\n        <th>Type</th>\r\n        <th>Detail</th>\r\n      </tr>\r\n      <tr>\r\n        <td>Username</td>\r\n        <td>${request.username}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Password</td>\r\n        <td>${request.password}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Scheduler TimeZone</td>\r\n        <td>${request.timeZone}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Role</td>\r\n        <td>${request.role}</td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>",
      status: {
        lookupType: "ACTIVE",
        lookupCode: 1,
        lookupValue: "Active",
        color: STATUS_TYPE.DELETE
      },
      dateCreated: "2023-03-27T15:02:53.610+00:00"
    }
]

export const TEMPLATE_TABLE: IStaticTable = {
    tableId: 'template_id',
    title: 'Template',
    bordered: true,
    checkbox: true,
    size: 'small',
    dataSource: TEMPLATE_DATA,
    dataColumn: [
        {
            field: 'templateId',
            header: 'Id',
            type: 'data'
        },
        {
            field: 'templateName',
            header: 'Name',
            type: 'data'
        },
        {
            field: 'templateType',
            header: 'Type',
            type: 'data',
        },
        {
            field: 'status',
            header: 'Status',
            type: 'tag'
        },
        {
            field: 'dateCreated',
            header: 'Created',
            type: 'date'
        }
    ],
    actionType: [
        {
            type: 'edit',
            action: ActionType.EDIT
        },
        {
            type: 'delete',
            action: ActionType.DELETE
        },
        {
            type: 'plus-square',
            action: ActionType.EDIT
        }
    ]
}

export const INOTIFACTION_JOB: INotifaction[] = [
    {
        title: 'JOB (1001-1000-1000)',
        data: {
            date: '20-02-2023 11:99',
            timezone: 'GMT-5:00) America/New_York :: Eastern Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'stop',
        statusType: 'gold'
    },
    {
        title: 'JOB (1000-1000-1000)',
        data: {
            date: '20-02-2023 05:99',
            timezone: '(GMT-9:00) US/Alaska :: Alaska Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'failed',
        statusType: 'error'
    },
    {
        title: 'JOB (1000-1000-1000)',
        data: {
            date: '20-02-2023 02:99',
            timezone: '(GMT-5:00) US/East-Indiana :: Eastern Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'Success',
        statusType: 'success'
    },
    {
        title: 'JOB (1000-1000-1000)',
        data: {
            date: '20-02-2023 12:99',
            timezone: '(GMT-9:00) US/Alaska :: Alaska Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'failed',
        statusType: 'error'
    },
    {
        title: 'JOB (1000-1000-1000)',
        data: {
            date: '20-02-2023 12:99',
            timezone: '(GMT-6:00) US/Central :: Central Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'Success',
        statusType: 'success'
    },
    {
        title: 'JOB (1000-1000-1000)',
        data: {
            date: '20-02-2023 12:99',
            timezone: '(GMT-10:00) US/Aleutian :: Hawaii Standard Time',
        },
        avatar: './assets/notifaction/job.png',
        status: 'Success',
        statusType: 'success'
    }
];

export const INOTIFACTION_EMAIL: INotifaction[] = [
    {
        title: 'CHANGE ACCOUNT TIMEZONE',
        data: {
            date: '20-02-2023 11:99',
            message: 'Your Account Timezone Change'
        },
        avatar: './assets/notifaction/mail.png'
    },
    {
        title: 'FORGOT PASS',
        data: {
            date: '20-02-2023 11:99',
            message: 'Forgot Password Email Send'
        },
        avatar: './assets/notifaction/mail.png'
    },
    {
        title: 'REGISTER USER',
        data: {
            date: '20-02-2023 11:99',
            message: 'Dear User Welcom To T-Target 2023,\nNow you can access your all source job'
        },
        avatar: './assets/notifaction/mail.png'
    }
];

export const LOOKUP_TYPE = {
    APPLICATION_STATUS: 'APPLICATION_STATUS',
    EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
    CREDENTIAL_TYPE: 'CREDENTIAL_TYPE'
}

export const DELETE = "DELETE";