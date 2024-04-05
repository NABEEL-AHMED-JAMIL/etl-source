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
    description?: any;
}

export interface IGroup extends IBaseEntity {
    name?: any;
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

export interface IAppUser extends IBaseEntity  {
    firstName?: any;
    lastName?: any;
    email?: any;
    username?: any;
    password?: any;
    profileImg?: any;
    ipAddress?: any;
    company?: ICompany;
    roles?: any;
    profile?: any;
}

export interface ICompany extends IBaseEntity {
    name?: any;
    address?: any;
    email?: any;
    phone?: any;
}

export interface IQuery {
    query?: any;
    column?: any;
    data?: any;
}

export interface ILinkRURequest extends IBaseEntity {
    roleId?: any;
    appUserId?: any;
    linked?: any;
}

export interface ILinkPURequest extends IBaseEntity {
    profileId?: any;
    appUserId?: any;
    linked?: any;
}

export interface ILinkRPUResponse {
    id?: any;
    email?: any;
    fullName?: any;
    profileImg?: any;
    linkData?: any;
    linkStatus?: any;
    linked?: any;
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
    title: any;
    data?: any;
    avatar: any;
    status?: any,
    statusType?: any
}

export interface ICrossTabResponse {
    row: any;
    col: any;
    crossTab: any;
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
    ENABLED = 11
}

export enum IProfileSetting {
    USER_INFO,
    COMPANY_INFO,
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
                permission: ['SOURCE_TASK_PERMISSION'],
            },
            {
                name: 'Source Task Type',
                icon: 'dropbox',
                link: '/setting/mgSourceTaskType',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_TASKTYPE_PERMISSION'],
            },
            {
                name: 'Source Credential',
                icon: 'key',
                link: '/setting/mgCredentail',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_CREDENTAIL_PERMISSION'],
            },
            {
                name: 'Source Storage',
                icon: 'book',
                link: '/setting/mgStorage',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SOURCE_STORAGE_PERMISSION'],
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
                permission: ['FORM_PERMISSION'],
            },
            {
                name: 'Manage Section',
                icon: 'highlight',
                link: '/setting/mgSection',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['SECTION_PERMISSION'],
            },
            {
                name: 'Manage Control',
                icon: 'control',
                link: '/setting/mgControl',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['CONTROL_PERMISSION'],
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
                link: '/setting/playGround',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['PLAY_GROUND_PERMISSION'],
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
                name: 'Manage Groups',
                icon: 'usergroup-add',
                link: '/setting/mgGroup',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                permission: ['GROUP_PERMISSION']
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
    MASTER_ADMIN: 'MASTER_ADMIN'
}

export const enum APPLICATION_STATUS {
    INACTIVE, ACTIVE, DELETE
}