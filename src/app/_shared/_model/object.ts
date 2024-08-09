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

export interface IKeyValue {
    name?: any;
    value?: any;
}

export interface IETLCountry {
    countryCode?: any;
    countryName?: any;
    code?: any;
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
    organization?: any;
    accountType?: any;
    profile?: any;
}

export interface IValueOption<T> {
    lookupType: any;
    lookupCode: T;
    lookupValue: any;
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

export interface IEventBridge extends IBaseEntity {
    name?: any;
    bridgeUrl?: any;
    httpMethod?: any;
    description?: any;
    bridgeType?: any;
    credential?: any;
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
    description?: any;
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
    accountType?: any;
    organization?: IOrganization;
    enVariables?: any;
    eventBridge?: any;
}

export interface IOrganization extends IBaseEntity {
    name?: any;
    address?: any;
    email?: any;
    phone?: any;
    country?: any;
    owner?: IAppUser;
}

export interface ICredential extends IBaseEntity {
    name?: any;
    description: any;
    type?: any;
    content?: any;
}

export interface ISourceTask extends IBaseEntity {
    taskName: any;
    description: any;
    sourceTaskType: ISTT;
    formData: any;
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
    report?: IReportSetting;
    dashboard?: IDashboardSetting
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
    minLength?: any;
    maxLength?: any;
    fieldLkValue?: any;
    apiLkValue?: any;
    mandatory?: any;
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
    fieldWidth: any;
}

export interface ISectionLinkControl extends IBaseEntity {
    controlName?: any;
    fieldType?: any;
    fieldTitle?: any;
    fieldName?: any;
    controlOrder?: any;
    fieldWidth: any;
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

export interface IEnableAbilityConfig extends IBaseEntity {
    name?: any;
    description?: any;
    enableLogic?: IConditionalLogic[];
}

export interface IVisibilityConfig extends IBaseEntity {
    name?: any;
    description?: any;
    enableLogic?: IConditionalLogic[];
}

export interface IConditionalLogic extends IBaseEntity {
    caseConditions?: ICaseCondition[];
    thenConditions?: IThenCondition[];
}

export interface ICaseCondition extends IBaseEntity {
    name?: any;
    description?: any;
    dynamicCondition?: any;
    logicalOperators?: any;
    comparisonOperators?: any;
    genSection?: any;
    genControl?: any;
    caseValue?: any;
}

export interface IThenCondition extends IBaseEntity {
    name?: any;
    description?: any;
    section?: any;
    genControl?: any;
    action?: any;
}

export interface ISourceTaskTypeLinkForm extends IBaseEntity {
    formName?: any;
    formType?: any;
    linkStatus?: any;
    formLinkStt?: any;
}

export interface ISourceTaskTypeLinkForm extends IBaseEntity {
    formName?: any;
    formType?: any;
    linkStatus?: any;
    sttLinkForm?: any;
}

export interface IFormLinkSourceTaskType extends IBaseEntity {
    serviceName?: any;
    taskType?: any;
    linkStatus?: any;
    linkSourceTaskTypeId?: any;
}

export interface ISCVisibility {
    visible?: IVisible;
}

export interface ISCEnableability {
    visible?: IVisible;
}

export interface IVisible {
    condition: any;
    target: ITarget[];
}

export interface ITarget {
    section: any;
    filed: any;
    visible?: any; // if object ISCVisibility
    enabled?: any; // if object ISCEnableability
    description: any;
}

export interface IDashboardSetting extends IBaseEntity {
    name?: any;
    groupType?: any;
    description?: any;
    boardType?: any;
    dashboardUrl?: any;
    iframe?: any;
}

export interface IReportSetting extends IBaseEntity {
    dateFilter?: any;
    recordReport?: any;
    fetchRate?: any;
    name?: any;
    groupType?: any;
    description?: any;
    payloadRef?: any;
    isPdf?: any;
    pdfBridge?: any;
    isXlsx?: any;
    xlsxBridge?: any;
    isCsv?: any;
    csvBridge?: any;
    isData?: any;
    dataBridge?: any;
    isFirstDimension?: any;
    firstDimensionBridge?: any;
    firstDimensionLKValue?: any;
    isSecondDimension?: any;
    secondDimensionBridge?: any;
    secondDimensionLKValue?: any;
    isThirdDimension?: any;
    thirdDimensionBridge?: any;
    thirdDimensionLKValue?: any;
    distinctLKValue?: any;
    aggLKValue?: any;
    formResponse?: any;
}

export interface IStaticTable {
    tableId?: any;
    title?: any;
    expand?: boolean;
    bordered?: boolean,
    checkbox?: boolean,
    size?: NzTableSize,
    dataSource?: any[];
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
    showImg?: boolean;
    subfield?: any;
    color?: any;
    compare?: any;
    priority?: any;
    status?: any; // this will check the status in the table for icon
}

export interface INotification {
    id: any;
    title: any;
    data?: any;
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
    LINK_CONTROL = 16,
    LINK_EVENT_BRIDGE = 17,
    GEN_TOKEN = 18
}

export enum IProfileSetting {
    USER_INFO,
    CHANGE_PASSWORD,
    MY_TEAM,
    ENVIROMENT
}

export interface SideBar {
    name: any;
    icon?: any;
    link?: any;
    roles?: any[];
    permission?: any[];
    childLinks?: SideBar[];
}

export interface ISession {
    dailyCount?: any;
    weeklyCount?: any;
    monthlyCount?: any;
    yearlyCount?: any;
    daily?: IKeyValue[];
    weekly?: IKeyValue[];
    monthly?: IKeyValue[];
    yearly?: IKeyValue[];
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
            }
        ]
    },
    {
        name: 'Asset Store',
        icon: 'folder',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
        permission: ['ASSET_STORE_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Bucket',
                icon: 'folder-open',
                link: '/setting/store',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['BUCKET_SETTING_PERMISSION']
            }
        ]
    },
    {
        name: 'Dashboard Setting',
        icon: 'pie-chart',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
        permission: ['DASHBOARD_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Dashboard',
                icon: 'form',
                link: '/setting/mgDashboard',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['MANAGE_DASHBOARD_PERMISSION']
            }
        ]
    },
    {
        name: 'Report Setting',
        icon: 'paper-clip',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
        permission: ['REPORT_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Report',
                icon: 'form',
                link: '/setting/mgReport',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['MANAGE_REPORT_PERMISSION']
            },
            {
                name: 'Manage OLAP',
                icon: 'form',
                link: '/setting/mgOLAP',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['MANAGE_OLAP_PERMISSION']
            }
        ]
    },
    {
        name: 'Form Setting',
        icon: 'database',
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
        permission: ['FORM_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Manage Form',
                icon: 'form',
                link: '/setting/mgForm',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['FORM_PERMISSION']
            },
            {
                name: 'Manage Section',
                icon: 'highlight',
                link: '/setting/mgSection',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['SECTION_PERMISSION']
            },
            {
                name: 'Manage Control',
                icon: 'control',
                link: '/setting/mgControl',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['CONTROL_PERMISSION']
            },
            {
                name: 'Enable & Visible',
                icon: 'mac-command',
                link: '/setting/evConfig',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['ENABLE_AND_VISIBLE_CONTROL_PERMISSION']
            },
            {
                name: 'Dynamic Payload',
                icon: 'partition',
                link: '/setting/dynamicPayload',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['DYNAMIC_PAYLOAD_PERMISSION']
            },
            {
                name: 'Play Ground',
                icon: 'html5',
                link: '/setting/mgPlayGround',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                name: 'Users',
                icon: 'user-add',
                link: '/setting/mgUsers',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
                permission: ['USER_PERMISSION']
            },
            {
                name: 'Organization',
                icon: 'deployment-unit',
                link: '/setting/mgOrganization',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
                permission: ['ORGANIZATION_PERMISSION']
            },
            {
                name: 'Role & Profile',
                icon: 'pushpin',
                link: '/setting/mgRPP',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DB', 'ROLE_DEV'],
                permission: ['RPP_PERMISSION']
            },
            {
                name: 'Refresh Token',
                icon: 'euro',
                link: '/setting/mgRefreshToken',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
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
                name: 'Credential',
                icon: 'key',
                link: '/setting/mgCredentail',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['SOURCE_CREDENTAIL_PERMISSION']
            },
            {
                name: 'Event Bridge',
                icon: 'group',
                link: '/setting/mgEventBridge',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['EVENT_BRIDGE_PERMISSION']
            },
            {
                name: 'E-Variable',
                icon: 'font-colors',
                link: '/setting/mgEvariable',
                roles: ['ROLE_DEV'],
                permission: ['EVARIABL_PERMISSION']
            },
            {
                name: 'Lookups',
                icon: 'control',
                link: '/setting/mgLookup',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['LOOKUP_PERMISSION']
            },
            {
                name: 'Template',
                icon: 'mail',
                link: '/setting/mgTemplate',
                roles: ['ROLE_DEV'],
                permission: ['TEMPLATE_PERMISSION']
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
    FETCH_LIMIT: 'FETCH_LIMIT',
    UI_LOOKUP: 'UI_LOOKUP',
    APPLICATION_STATUS: 'APPLICATION_STATUS',
    EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
    CREDENTIAL_TYPE: 'CREDENTIAL_TYPE',
    MASTER_ADMIN: 'MASTER_ADMIN',
    FORM_TYPE: 'FORM_TYPE',
    FIELD_TYPE: 'FIELD_TYPE',
    IS_DEFAULT: 'IS_DEFAULT',
    TASK_TYPE: 'TASK_TYPE',
    REQUEST_METHOD: 'REQUEST_METHOD',
    DASHBOARD_TYPE: 'DASHBOARD_TYPE',
    PAYLOAD_REF: 'PAYLOAD_REF',
    EVENT_BRIDGE_TYPE: 'EVENT_BRIDGE_TYPE',
    COMPARISON_OPERATORS: 'COMPARISON_OPERATORS',
    LOGICAL_OPERATORS: 'LOGICAL_OPERATORS',
    DYNAMIC_CONDITION: 'DYNAMIC_CONDITION'
}

export const enum UI_LOOKUP {
    FALSE = 0,
    TRUE = 1
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
    ENV_HOME_PAGE: 'ENV_HOME_PAGE',
    DASHBOARD_GROUP: 'DASHBOARD_GROUP',
    REPORT_GROUP: 'REPORT_GROUP'
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
    MULTI_SELECT = 18,
    KEY_VALUE = 19,
    YEAR = 20,
    DYNAMIC_PAYLOAD = 21,
}

export const enum TASK_TYPE {
    API = 0,
    AWS_SQS = 1,
    WEB_SOCKET = 2,
    KAFKA = 3,
    AWS_S3 = 4,
    AWS_LAMBDA = 5
}

export const enum REQUEST_METHOD {
    GET = 0,
    HEAD = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4
}

export const enum FORM_TYPE {
    SERVICE_FORM = 0,
    REPORT_FORM = 1
}

export const enum PAYLOAD_REF {
    DYNAMIC_REPORT_PAYLOAD = 0,
    REF_REPORT_FORM = 1
}

export const enum IS_DEFAULT {
    NO_DEFAULT = 0,
    YES_DEFAULT = 1
}

export const enum EVENT_BRIDGE_TYPE {
    WEB_HOOK_SEND = 0,
    WEB_HOOK_RECEIVE = 1,
    REPORT_API_SEND = 2
}

export const enum DASHBOARD_TYPE {
    POWER_BI = 0,
    TABLEAU = 1,
    CUSTOM_DASHBOARD = 2
}

export const enum SERVER_ACTION {
    ADD,
    EDIT,
    DELETE,
    VIEW,
    LINK,
    UNLINK
}

export const ORGANIZATIONS: IOrganization[] = [{'id': 18,
    'name': 'Ministry of Education and Higher Education',
    'address': 'Supreme Education Council, Doha',
    'email': 'info@edu.gov.qa',
    'phone': '+9744404444',
    'country': 'QAT'},
   {'id': 19,
    'name': 'Ministry of Public Health',
    'address': 'Hamad Medical City, Doha',
    'email': 'ghcc@moph.gov.qa',
    'phone': '+97444070000',
    'country': 'QAT'},
   {'id': 20,
    'name': 'Ministry of Endowments and Islamic Affairs (Awqaf)',
    'address': 'Al Funduq St, Doha',
    'email': 'public.sec@islam.gov.qa',
    'phone': '+97444700000',
    'country': 'QAT'},
   {'id': 21,
    'name': 'Ministry of Finance',
    'address': 'Doha',
    'email': 'info@mof.gov.qa',
    'phone': '+97444461444',
    'country': 'QAT'},
   {'id': 22,
    'name': 'Ministry of Interior',
    'address': 'Doha',
    'email': 'info@moi.gov.qa',
    'phone': '2366666',
    'country': 'QAT'},
   {'id': 24,
    'name': 'Ministry of Transport',
    'address': 'Excellence Tower, Al Shatt St, Doha',
    'email': 'info@mot.gov.qa',
    'phone': '+97440451111',
    'country': 'QAT'},
   {'id': 23,
    'name': 'Ministry of Foreign Affairs',
    'address': 'West Bay, Doha',
    'email': 'info@mofa.gov.qa',
    'phone': '+97440111111',
    'country': 'QAT'},
   {'id': 25,
    'name': 'Ministry of Communications and Information Technology',
    'address': 'Al Nasr Tower B, Doha',
    'email': 'info@mcit.gov.qa',
    'phone': '+97444733333',
    'country': 'QAT'},
   {'id': 26,
    'name': 'Ministry of Labour',
    'address': 'Diplomatic Area Beside Dolphin Tower, Doha',
    'email': 'info@mol.gov.qa',
    'phone': '+97444068979',
    'country': 'QAT'},
   {'id': 27,
    'name': 'Ministry of Culture',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97444372754',
    'country': 'QAT'},
   {'id': 28,
    'name': 'Ministry of Justice',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@justice.gov.qa',
    'phone': '+97447312526',
    'country': 'QAT'},
   {'id': 29,
    'name': 'Ministry of Social Welfare',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@socialwelfare.gov.qa',
    'phone': '+97447319793',
    'country': 'QAT'},
   {'id': 30,
    'name': 'Ministry of Tourism',
    'address': 'Diamond Building, Msheireb, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97443548695',
    'country': 'QAT'},
   {'id': 31,
    'name': 'Ministry of Energy',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@energy.gov.qa',
    'phone': '+97445638579',
    'country': 'QAT'},
   {'id': 32,
    'name': 'Ministry of Environment',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@environment.gov.qa',
    'phone': '+97446732814',
    'country': 'QAT'},
   {'id': 33,
    'name': 'Ministry of Tourism',
    'address': 'Sunshine Building, Al Sadd, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97447675610',
    'country': 'QAT'},
   {'id': 34,
    'name': 'Ministry of Sports',
    'address': 'Silver Street, Muraikh, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97441403597',
    'country': 'QAT'},
   {'id': 35,
    'name': 'Ministry of Fisheries',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@fisheries.gov.qa',
    'phone': '+97446714870',
    'country': 'QAT'},
   {'id': 36,
    'name': 'Ministry of Environment',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@environment.gov.qa',
    'phone': '+97440472342',
    'country': 'QAT'},
   {'id': 37,
    'name': 'Ministry of Sports',
    'address': 'Silver Street, Muraikh, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97446470242',
    'country': 'QAT'},
   {'id': 38,
    'name': 'Ministry of Agriculture',
    'address': 'Sunshine Building, Al Sadd, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97446405948',
    'country': 'QAT'},
   {'id': 39,
    'name': 'Ministry of Justice',
    'address': 'Diamond Building, Msheireb, Doha',
    'email': 'info@justice.gov.qa',
    'phone': '+97442834379',
    'country': 'QAT'},
   {'id': 40,
    'name': 'Ministry of Tourism',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97448455727',
    'country': 'QAT'},
   {'id': 41,
    'name': 'Ministry of Tourism',
    'address': 'Silver Street, Muraikh, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97447770137',
    'country': 'QAT'},
   {'id': 42,
    'name': 'Ministry of Sports',
    'address': 'Blue Plaza, Corniche, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97443392442',
    'country': 'QAT'},
   {'id': 43,
    'name': 'Ministry of Sports',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97449990567',
    'country': 'QAT'},
   {'id': 44,
    'name': 'Ministry of Tourism',
    'address': 'Green Tower, West Bay, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97442430846',
    'country': 'QAT'},
   {'id': 45,
    'name': 'Ministry of Tourism',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97441247015',
    'country': 'QAT'},
   {'id': 46,
    'name': 'Ministry of Agriculture',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97448652802',
    'country': 'QAT'},
   {'id': 47,
    'name': 'Ministry of Agriculture',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97448532785',
    'country': 'QAT'},
   {'id': 48,
    'name': 'Ministry of Fisheries',
    'address': 'Blue Plaza, Corniche, Doha',
    'email': 'info@fisheries.gov.qa',
    'phone': '+97448914629',
    'country': 'QAT'},
   {'id': 49,
    'name': 'Ministry of Technology',
    'address': 'Green Tower, West Bay, Doha',
    'email': 'info@technology.gov.qa',
    'phone': '+97442495850',
    'country': 'QAT'},
   {'id': 50,
    'name': 'Ministry of Fisheries',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@fisheries.gov.qa',
    'phone': '+97447519713',
    'country': 'QAT'},
   {'id': 51,
    'name': 'Ministry of Culture',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97443645867',
    'country': 'QAT'},
   {'id': 52,
    'name': 'Ministry of Culture',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97447973645',
    'country': 'QAT'},
   {'id': 53,
    'name': 'Ministry of Energy',
    'address': 'Diamond Building, Msheireb, Doha',
    'email': 'info@energy.gov.qa',
    'phone': '+97448227852',
    'country': 'QAT'},
   {'id': 54,
    'name': 'Ministry of Environment',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@environment.gov.qa',
    'phone': '+97445659999',
    'country': 'QAT'},
   {'id': 55,
    'name': 'Ministry of Sports',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97441292585',
    'country': 'QAT'},
   {'id': 56,
    'name': 'Ministry of Agriculture',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97447468026',
    'country': 'QAT'},
   {'id': 57,
    'name': 'Ministry of Culture',
    'address': 'Green Tower, West Bay, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97449523923',
    'country': 'QAT'},
   {'id': 58,
    'name': 'Ministry of Sports',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97449082311',
    'country': 'QAT'},
   {'id': 59,
    'name': 'Ministry of Sports',
    'address': 'Blue Plaza, Corniche, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97443549877',
    'country': 'QAT'},
   {'id': 60,
    'name': 'Ministry of Sports',
    'address': 'Green Tower, West Bay, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97442521260',
    'country': 'QAT'},
   {'id': 61,
    'name': 'Ministry of Sports',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@sports.gov.qa',
    'phone': '+97449845167',
    'country': 'QAT'},
   {'id': 62,
    'name': 'Ministry of Tourism',
    'address': 'Blue Plaza, Corniche, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97441169507',
    'country': 'QAT'},
   {'id': 63,
    'name': 'Ministry of Culture',
    'address': 'Crescent Tower, West Bay, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97440999861',
    'country': 'QAT'},
   {'id': 64,
    'name': 'Ministry of Agriculture',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97447978421',
    'country': 'QAT'},
   {'id': 65,
    'name': 'Ministry of Fisheries',
    'address': 'Diamond Building, Msheireb, Doha',
    'email': 'info@fisheries.gov.qa',
    'phone': '+97448590606',
    'country': 'QAT'},
   {'id': 66,
    'name': 'Ministry of Tourism',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@tourism.gov.qa',
    'phone': '+97443703609',
    'country': 'QAT'},
   {'id': 67,
    'name': 'Ministry of Environment',
    'address': 'Blue Plaza, Corniche, Doha',
    'email': 'info@environment.gov.qa',
    'phone': '+97446735474',
    'country': 'QAT'},
   {'id': 68,
    'name': 'Ministry of Social Welfare',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@socialwelfare.gov.qa',
    'phone': '+97440257754',
    'country': 'QAT'},
   {'id': 69,
    'name': 'Ministry of Agriculture',
    'address': 'Sunshine Building, Al Sadd, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97449284600',
    'country': 'QAT'},
   {'id': 70,
    'name': 'Ministry of Energy',
    'address': 'Pearl Tower, Lusail, Doha',
    'email': 'info@energy.gov.qa',
    'phone': '+97448495504',
    'country': 'QAT'},
   {'id': 71,
    'name': 'Ministry of Culture',
    'address': 'Moon Street, Wakra, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97449455042',
    'country': 'QAT'},
   {'id': 72,
    'name': 'Ministry of Technology',
    'address': 'Silver Street, Muraikh, Doha',
    'email': 'info@technology.gov.qa',
    'phone': '+97440792744',
    'country': 'QAT'},
   {'id': 73,
    'name': 'Ministry of Agriculture',
    'address': 'Golden Square, Old Town, Doha',
    'email': 'info@agriculture.gov.qa',
    'phone': '+97440355529',
    'country': 'QAT'},
   {'id': 74,
    'name': 'Ministry of Culture',
    'address': 'Silver Street, Muraikh, Doha',
    'email': 'info@culture.gov.qa',
    'phone': '+97441112906',
    'country': 'QAT'},
   {'id': 75,
    'name': 'Ministry of Energy',
    'address': 'Star Avenue, Al Rayyan, Doha',
    'email': 'info@energy.gov.qa',
    'phone': '+97446367697',
    'country': 'QAT'},
   {'id': 76,
    'name': 'Ministry of Justice',
    'address': 'Sunshine Building, Al Sadd, Doha',
    'email': 'info@justice.gov.qa',
    'phone': '+97443246195',
    'country': 'QAT'}];