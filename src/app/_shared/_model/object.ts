import { NzTableSize } from 'ng-zorro-antd/table';

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

export interface AuthResponse {
    id: any;
    token: any;
    type: any;
    refreshToken: any;
    ipAddress: any;
    username: any;
    email: any;
    roles: any;
    profileImage?: any;
    firstName?: any;
    lastName?: any;
    profile?: any;
}

export interface IValueOption<T> {
    lookupType: string;
    lookupCode: T;
    lookupValue: string;
    color?: any;
}

export interface ApiResponse {
    status?: ApiCode;
    message?: any;
    data?: any;
    paging?: any;
}

export interface IBaseEntity {
    id?: any;
    dateCreated?: any;
    dateUpdated?: any;
    createdBy?: IActionByUser;
    updatedBy?: IActionByUser;
    status?: any;
}

export interface IActionByUser {
    id?: any;
    email?: any;
    username?: any;
}

export interface ILookupData extends IBaseEntity {
    lookupCode?: any;
    lookupType?: any;
    lookupValue?: any;
    description?: any;
    uiLookup?: any;
    lookupChildren?: ILookupData[];
}

export interface ILookups {
    PARENT_LOOKUP_DATA: ILookupData;
    SUB_LOOKUP_DATA: ILookupData[]
}

export interface IProfile extends IBaseEntity {
    profileName?: any;
    description?: any;
    permission?: IPermission[];
}

export interface IEnVariables extends IBaseEntity {
    envKey?: any;
    envValue?: any;
    description?: any;
}

export interface IPermission extends IBaseEntity {
    permissionName?: any;
    description?: any;
}

export interface IRefreshToken extends IBaseEntity {
    token?: any;
    expiryDate?: any;
    ipAddress?: any;
}

export interface ITemplateReg extends IBaseEntity {
    templateName?: any;
    templateContent?: any;
    dateCreated?: any;
}

export interface IRole extends IBaseEntity {
    name?: any;
    description?: any;
}

export interface IAppUser extends IBaseEntity {
    firstName?: any;
    lastName?: any;
    email?: any;
    username?: any;
    password?: any;
    profileImg?: any;
    ipAddress?: any;
    roles?: any;
    profile?: any;
    enVariables?: any;
}

export interface ICredential extends IBaseEntity {
    name?: any;
    type?: any;
    content?: any;
}

export interface ISTT extends IBaseEntity {
    serviceName?: any;
    description?: any;
    taskType?: any;
    credentialId?: any;
    credential?: any;
    kafkaTaskType?: any;
    apiTaskType?: any;
}

export interface IQuery {
    query?: any;
    column?: any;
    data?: any;
}

export interface ILinkRU extends IBaseEntity {
    roleId?: any;
    appUserId?: any;
    linked?: any;
}

export interface ILinkPU extends IBaseEntity {
    profileId?: any;
    appUserId?: any;
    linked?: any;
}

export interface ILinkRPU extends IBaseEntity {
    email?: any;
    fullName?: any;
    profileImg?: any;
    linkData?: any;
    linkStatus?: any;
    linked?: any;
}

export interface IGenFrom extends IBaseEntity {
    formName: any;
    description: any;
    homePage: any;
    serviceId: any;
    formType: any;
    totalSection: any;
    totalStt: any;
}

export interface IGenSection extends IBaseEntity {
    sectionName?: any;
    description?: any;
    totalControl?: any;
    totalForm?: any;
}

export interface IGenControl extends IBaseEntity {
    controlName?: any;
    description?: any;
    fieldType?: any;
    fieldTitle?: any;
    fieldName?: any;
    placeHolder?: any;
    fieldWidth?: any;
    minLength?: any;
    maxLength?: any;
    fieldLkValue?: any;
    mandatory?: any;
    disabled?: any;
    isDefault?: any;
    defaultValue?: any;
    pattern?: any;
    totalSection?: any;
}

export interface IControlLinkSection extends IBaseEntity {
    sectionName?: any;
    description?: any;
    linkedControl?: any;
    linkSectionId?: any;
    controlOrder?: any;
}

export interface ISectionLinkControl extends IBaseEntity {
    controlName?: any;
    fieldType?: any;
    fieldTitle?: any;
    fieldName?: any;
    controlOrder?: any;
    linkedSection?: any;
    linkControlId?: any;
}

export interface ISectionLinkFrom extends IBaseEntity {
    formName?: any;
    formType?: any;
    linkStatus?: any;
    sectionOrder?: any;
    sectionLinkForm?: any;
}

export interface IFormLinkSection extends IBaseEntity {
    sectionName?: any;
    description?: any;
    linkStatus?: any;
    sectionOrder?: any;
    formLinkSection?: any;
}

export interface ISourceTaskTypeLinkForm extends IBaseEntity  {
    formName?: any;
    formType?: any;
    linkStatus?: any;
    formLinkStt?: any;
}

export interface ISourceTaskTypeLinkForm extends IBaseEntity  {
    formName?: any;
    formType?: any;
    linkStatus?: any;
    sttLinkForm?: any;
}

export interface IFormLinkSourceTaskType extends IBaseEntity  {
    serviceName?: any;
    taskType?: any;
    linkStatus?: any;
    linkSourceTaskTypeId?: any;
}

export interface IStaticTable {
    tableId?: any;
    title?: any;
    expand?: boolean;
    bordered?: boolean,
    checkbox?: boolean,
    size?: NzTableSize,
    dataSource?: readonly any[];
    dataColumn?: IColumn[];
    actionType?: any; // delete,update,subnode,more->dropdown
    moreActionType?: any; // delete,update,subnode,more->dropdown
    headerButton?: any;
    extraHeaderButton?: any;
    enableAction?: boolean; // for toggle single action
}

export interface IColumn {
    field?: any;
    childe?: any;
    header?: any;
    type?: any;
    subfield?: any;
    color?: any;
    compare?: any;
    priority?: any;
}

export interface INotifaction {
    id: any;
    title: any;
    data?: any;
    avatar: any;
    status?: any,
    statusType?: any
    notifyType?: any;
}

export interface ICrossTab {
    row: any;
    col: any;
    crossTab: any;
}

export interface IControlPattern {
    type?: any;
    pattern?: any;
    value?: any;
}

export interface ISubAppUser {
    id: any,
    fullname: any;
    email: any;
    username: any;
}

// delete,update,subnode,more->dropdown
export enum ActionType {
    DELETE = 0,
    ADD = 1,
    EDIT = 2,
    VIEW = 3,
    SUBNODE = 4,
    MORE = 5,
    RE_FRESH = 6,
    UPLOAD = 7,
    DOWNLOAD = 8,
    LINK = 9,
    DISABLED = 10,
    ENABLED = 11,
    TREE = 12,
    LINK_STT = 13,
    LINK_FROM = 14,
    LINK_SECTION = 15,
    LINK_CONTROL = 16
}

export enum IProfileSetting {
    USER_INFO,
    CHANGE_PASSWORD,
    MY_TEAM,
    ENVIROMENT
}

export interface SideBar {
    name: string;
    icon?: string;
    link?: string;
    roles?: any[];
    permission?: any[];
    childLinks?: SideBar[];
}

export const CONTROL_PATTERN: IControlPattern[] = [
    {
        type: 'Tel',
        pattern: 'xxx-xxx-xxxx',
        value: '333-333-3333'
    },
    {
        type: 'Week',
        pattern: '-',
        value: '2024-W07'
    },
    {
        type: 'Tel',
        pattern: '-',
        value: '06:11:00'
    },
    {
        type: 'Color',
        pattern: '-',
        value: '#3497db'
    },
    {
        type: 'Date',
        pattern: '-',
        value: '1993-08-06'
    },
    {
        type: 'Email',
        pattern: 'Email Pattern',
        value: 'abc@gmail.com'
    },
    {
        type: 'Month',
        pattern: '-',
        value: '1993-08'
    }
];

export const SETTING_SIDEBAR: SideBar[] = [
    {
        name: 'Service Setting',
        icon: 'dingding',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        permission: ['SERVICE_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Source Task',
                icon: 'sketch',
                link: '/setting/mgSourceTask',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_TASK_PERMISSION']
            },
            {
                name: 'Source Task Type',
                icon: 'dropbox',
                link: '/setting/mgSourceTaskType',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_TASKTYPE_PERMISSION']
            },
            {
                name: 'Source Credential',
                icon: 'key',
                link: '/setting/mgCredentail',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_CREDENTAIL_PERMISSION']
            }
        ]
    },
    {
        name: 'Report Setting',
        icon: 'pie-chart',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        permission: ['REPORT_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Report',
                icon: 'form',
                link: '/setting/mgReport',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['MANAGE_REPORT_PERMISSION']
            },
            {
                name: 'Report Play Ground',
                icon: 'html5',
                link: '/setting/mgReportPlayGround',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['REPORT_PLAY_GROUND_PERMISSION']
            }
        ]
    },
    {
        name: 'Form Setting',
        icon: 'database',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
        permission: ['FORM_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Form',
                icon: 'form',
                link: '/setting/mgForm',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['FORM_PERMISSION']
            },
            {
                name: 'Manage Section',
                icon: 'highlight',
                link: '/setting/mgSection',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SECTION_PERMISSION']
            },
            {
                name: 'Manage Control',
                icon: 'control',
                link: '/setting/mgControl',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['CONTROL_PERMISSION']
            },
            {
                name: 'Dynamic Payload',
                icon: 'partition',
                link: '/setting/dynamicPayload',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['DYNAMIC_PAYLOAD_PERMISSION']
            },
            {
                name: 'Play Ground',
                icon: 'html5',
                link: '/setting/mgPlayGround',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['PLAY_GROUND_PERMISSION']
            }
        ]
    },
    {
        name: 'Profile Setting',
        icon: 'profile',
        roles: ['ROLE_DEV'],
        permission: ['PROFILE_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Users',
                icon: 'user-add',
                link: '/setting/mgUsers',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['USER_PERMISSION']
            },
            {
                name: 'Roler & Profile',
                icon: 'pushpin',
                link: '/setting/mgRPPToken',
                roles: ['ROLE_DEV'],
                permission: ['RPP_PERMISSION']
            },
            {
                name: 'Refresh Token',
                icon: 'euro',
                link: '/setting/mgRefreshToken',
                roles: ['ROLE_MASTER_ADMIN'],
                permission: ['REFRESH_TOKEN_PERMISSION']
            }
        ]
    },
    {
        name: 'App Setting',
        icon: 'appstore',
        roles: ['ROLE_DEV'],
        permission: ['APP_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Lookups',
                icon: 'control',
                link: '/setting/mgLookup',
                roles: ['ROLE_DEV'],
                permission: ['LOOKUP_PERMISSION']
            },
            {
                name: 'Manage Template',
                icon: 'mail',
                link: '/setting/mgTemplate',
                roles: ['ROLE_DEV'],
                permission: ['TEMPLATE_PERMISSION']
            },
            {
                name: 'Manage EVariable',
                icon: 'font-colors',
                link: '/setting/mgEvariable',
                roles: ['ROLE_DEV'],
                permission: ['EVARIABL_PERMISSION']
            }
        ]
    },
    {
        name: 'Support',
        icon: 'wifi',
        roles: ['ROLE_DEV'],
        permission: ['SUPPORT_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Query Inquiry',
                icon: 'console-sql',
                link: '/setting/inquery',
                roles: ['ROLE_DEV'],
                permission: ['QUERY_INQUIRY_PERMISSION']
            }
        ]
    }
];

export const LOOKUP_TYPE = {
    UI_LOOKUP: 'UI_LOOKUP',
    APPLICATION_STATUS: 'APPLICATION_STATUS',
    EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
    CREDENTIAL_TYPE: 'CREDENTIAL_TYPE',
    MASTER_ADMIN: 'MASTER_ADMIN',
    FORM_TYPE: 'FORM_TYPE',
    FIELD_TYPE: 'FIELD_TYPE',
    IS_DEFAULT: 'IS_DEFAULT',
    TASK_TYPE: 'TASK_TYPE',
    REQUEST_METHOD: 'REQUEST_METHOD'
}

export const enum APPLICATION_STATUS {
    INACTIVE, ACTIVE, DELETE
}

export const enum CREDENTIAL_TYPE {
    BASIC_AUTH = 0,
    CERTIFICATE = 1,
    AUTHORIZATION_CODE = 2,
    AWS_AUTH = 3,
    FIREBASE = 4,
    FTP = 5
}

export const enum NOTIFICATION_TYPE {
    USER_NOTIFICATION = 0,
    JOB_NOTIFICATION  = 1
}

export const E_VARAIABLE = {
    ENV_HOME_PAGE: 'ENV_HOME_PAGE'
}

export const enum FILED_TYPE {
    WEEK = 0,
    RANGE = 1,
    FILE = 2,
    DATE = 3,
    EMAIL = 4,
    TEL = 5,
    MONTH = 6,
    PASSWORD = 7,
    URL = 8,
    DATETIME_LOCAL = 9,
    NUMBER = 10,
    RADIO = 11,
    CHECKBOX = 12,
    COLOR = 13,
    TIME = 14,
    TEXT = 15,
    TEXTAREA = 16,
    SELECT = 17,
    MULTI_SELECT = 18
}

export const enum TASK_TYPE {
    API = 0,
    AWS_SQS = 1,
    WEB_SOCKET = 2,
    KAFKA = 3
}

export const enum REQUEST_METHOD {
    GET = 0,
    HEAD = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4
}