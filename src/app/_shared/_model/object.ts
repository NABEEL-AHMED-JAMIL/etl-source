import { NzTableSize } from 'ng-zorro-antd/table';

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
    uuid?: any;
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
    organization?: IOrganization;
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
    uuid?: any;
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
    image?: any;
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

export interface IQueryInquiry extends IBaseEntity {
    name: any;
    description: any;
    query: any;
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
    uuid: any;
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

// ***********
// Enum
// ***********

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

export enum APP_ADMIN {
    ROLE_MASTER_ADMIN = 'ROLE_MASTER_ADMIN',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER',
    ROLE_DB = 'ROLE_DB'
}

export enum APP_PROFILE {
    SUPER_ADMIN_PROFILE = 'SUPER_ADMIN_PROFILE',
    ADMIN_PROFILE = 'ADMIN_PROFILE',
    USER_PROFILE = 'USER_PROFILE',
    DB_PROFILE = 'DB_PROFILE'
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

export const ORGANIZATIONS: IOrganization[] = [
    {
        'id': 18,
        'name': 'MinistryofEducationandHigherEducation',
        'address': 'SupremeEducationCouncil, Doha',
        'email': 'info@edu.gov.qa',
        'image': 'qnl.png',
        'phone': '+9744404444',
        'country': 'QAT'
    },
    {
        'id': 19,
        'name': 'MinistryofPublicHealth',
        'address': 'HamadMedicalCity, Doha',
        'email': 'ghcc@moph.gov.qa',
        'image': 'moi.jpg',
        'phone': '+97444070000',
        'country': 'QAT'
    },
    {
        'id': 18,
        'name': 'MinistryofEducationandHigherEducation',
        'address': 'SupremeEducationCouncil, Doha',
        'email': 'info@edu.gov.qa',
        'image': 'qnl.png',
        'phone': '+9744404444',
        'country': 'QAT'
    },
    {
        'id': 19,
        'name': 'MinistryofPublicHealth',
        'address': 'HamadMedicalCity, Doha',
        'email': 'ghcc@moph.gov.qa',
        'image': 'moi.jpg',
        'phone': '+97444070000',
        'country': 'QAT'
    },
    {
        'id': 18,
        'name': 'MinistryofEducationandHigherEducation',
        'address': 'SupremeEducationCouncil, Doha',
        'email': 'info@edu.gov.qa',
        'image': 'qnl.png',
        'phone': '+9744404444',
        'country': 'QAT'
    },
    {
        'id': 19,
        'name': 'MinistryofPublicHealth',
        'address': 'HamadMedicalCity, Doha',
        'email': 'ghcc@moph.gov.qa',
        'image': 'moi.jpg',
        'phone': '+97444070000',
        'country': 'QAT'
    }
];

export const DATA: any = [
    {
        "value": 10,
        "key": "2024-03-14"
    },
    {
        "value": 4,
        "key": "2024-03-15"
    },
    {
        "value": 2,
        "key": "2024-03-18"
    },
    {
        "value": 8,
        "key": "2024-03-19"
    },
    {
        "value": 1,
        "key": "2024-03-20"
    },
    {
        "value": 7,
        "key": "2024-03-21"
    },
    {
        "value": 14,
        "key": "2024-03-22"
    },
    {
        "value": 1,
        "key": "2024-03-23"
    },
    {
        "value": 23,
        "key": "2024-03-24"
    },
    {
        "value": 5,
        "key": "2024-03-25"
    },
    {
        "value": 4,
        "key": "2024-03-26"
    },
    {
        "value": 4,
        "key": "2024-03-28"
    },
    {
        "value": 1,
        "key": "2024-03-29"
    },
    {
        "value": 1,
        "key": "2024-04-05"
    },
    {
        "value": 4,
        "key": "2024-04-06"
    },
    {
        "value": 8,
        "key": "2024-04-07"
    },
    {
        "value": 4,
        "key": "2024-04-08"
    },
    {
        "value": 2,
        "key": "2024-04-09"
    },
    {
        "value": 7,
        "key": "2024-04-11"
    },
    {
        "value": 3,
        "key": "2024-04-12"
    },
    {
        "value": 3,
        "key": "2024-04-13"
    },
    {
        "value": 4,
        "key": "2024-04-14"
    },
    {
        "value": 5,
        "key": "2024-04-15"
    },
    {
        "value": 2,
        "key": "2024-04-16"
    },
    {
        "value": 1,
        "key": "2024-04-17"
    },
    {
        "value": 6,
        "key": "2024-04-19"
    },
    {
        "value": 7,
        "key": "2024-04-20"
    },
    {
        "value": 3,
        "key": "2024-04-21"
    },
    {
        "value": 1,
        "key": "2024-04-22"
    },
    {
        "value": 8,
        "key": "2024-04-23"
    },
    {
        "value": 8,
        "key": "2024-04-24"
    },
    {
        "value": 3,
        "key": "2024-04-25"
    },
    {
        "value": 3,
        "key": "2024-04-26"
    },
    {
        "value": 2,
        "key": "2024-04-27"
    },
    {
        "value": 4,
        "key": "2024-04-28"
    },
    {
        "value": 1,
        "key": "2024-04-29"
    },
    {
        "value": 5,
        "key": "2024-04-30"
    },
    {
        "value": 4,
        "key": "2024-05-01"
    },
    {
        "value": 2,
        "key": "2024-05-02"
    },
    {
        "value": 4,
        "key": "2024-05-03"
    },
    {
        "value": 1,
        "key": "2024-05-04"
    },
    {
        "value": 4,
        "key": "2024-05-05"
    },
    {
        "value": 2,
        "key": "2024-05-06"
    },
    {
        "value": 4,
        "key": "2024-05-07"
    },
    {
        "value": 3,
        "key": "2024-05-08"
    },
    {
        "value": 6,
        "key": "2024-05-09"
    },
    {
        "value": 2,
        "key": "2024-05-10"
    },
    {
        "value": 6,
        "key": "2024-05-11"
    },
    {
        "value": 35,
        "key": "2024-05-12"
    },
    {
        "value": 3,
        "key": "2024-05-13"
    },
    {
        "value": 9,
        "key": "2024-05-14"
    },
    {
        "value": 2,
        "key": "2024-05-15"
    },
    {
        "value": 2,
        "key": "2024-05-16"
    },
    {
        "value": 1,
        "key": "2024-05-17"
    },
    {
        "value": 5,
        "key": "2024-05-19"
    },
    {
        "value": 2,
        "key": "2024-05-20"
    },
    {
        "value": 4,
        "key": "2024-05-21"
    },
    {
        "value": 4,
        "key": "2024-05-22"
    },
    {
        "value": 1,
        "key": "2024-05-23"
    },
    {
        "value": 1,
        "key": "2024-05-24"
    },
    {
        "value": 2,
        "key": "2024-05-26"
    },
    {
        "value": 1,
        "key": "2024-05-27"
    },
    {
        "value": 1,
        "key": "2024-05-28"
    },
    {
        "value": 5,
        "key": "2024-05-29"
    },
    {
        "value": 2,
        "key": "2024-05-30"
    },
    {
        "value": 6,
        "key": "2024-05-31"
    },
    {
        "value": 2,
        "key": "2024-06-01"
    },
    {
        "value": 4,
        "key": "2024-06-02"
    },
    {
        "value": 3,
        "key": "2024-06-03"
    },
    {
        "value": 2,
        "key": "2024-06-04"
    },
    {
        "value": 4,
        "key": "2024-06-05"
    },
    {
        "value": 11,
        "key": "2024-06-07"
    },
    {
        "value": 3,
        "key": "2024-06-08"
    },
    {
        "value": 2,
        "key": "2024-06-09"
    },
    {
        "value": 1,
        "key": "2024-06-14"
    },
    {
        "value": 1,
        "key": "2024-06-25"
    },
    {
        "value": 4,
        "key": "2024-06-27"
    },
    {
        "value": 2,
        "key": "2024-06-30"
    },
    {
        "value": 3,
        "key": "2024-07-01"
    },
    {
        "value": 2,
        "key": "2024-07-03"
    },
    {
        "value": 1,
        "key": "2024-07-04"
    },
    {
        "value": 1,
        "key": "2024-07-07"
    },
    {
        "value": 7,
        "key": "2024-07-11"
    },
    {
        "value": 3,
        "key": "2024-07-13"
    },
    {
        "value": 2,
        "key": "2024-07-14"
    },
    {
        "value": 5,
        "key": "2024-07-15"
    },
    {
        "value": 2,
        "key": "2024-07-16"
    },
    {
        "value": 7,
        "key": "2024-07-17"
    },
    {
        "value": 5,
        "key": "2024-07-18"
    },
    {
        "value": 2,
        "key": "2024-07-19"
    },
    {
        "value": 3,
        "key": "2024-07-21"
    },
    {
        "value": 2,
        "key": "2024-07-22"
    },
    {
        "value": 3,
        "key": "2024-07-23"
    },
    {
        "value": 1,
        "key": "2024-07-24"
    },
    {
        "value": 3,
        "key": "2024-07-25"
    },
    {
        "value": 1,
        "key": "2024-07-28"
    },
    {
        "value": 12,
        "key": "2024-07-29"
    },
    {
        "value": 1,
        "key": "2024-07-30"
    },
    {
        "value": 5,
        "key": "2024-07-31"
    },
    {
        "value": 6,
        "key": "2024-08-01"
    },
    {
        "value": 4,
        "key": "2024-08-02"
    },
    {
        "value": 13,
        "key": "2024-08-03"
    },
    {
        "value": 7,
        "key": "2024-08-04"
    },
    {
        "value": 9,
        "key": "2024-08-05"
    },
    {
        "value": 2,
        "key": "2024-08-07"
    },
    {
        "value": 4,
        "key": "2024-08-08"
    },
    {
        "value": 4,
        "key": "2024-08-09"
    },
    {
        "value": 7,
        "key": "2024-08-11"
    },
    {
        "value": 7,
        "key": "2024-08-12"
    },
    {
        "value": 7,
        "key": "2024-08-13"
    },
    {
        "value": 4,
        "key": "2024-08-14"
    },
    {
        "value": 2,
        "key": "2024-08-16"
    },
    {
        "value": 2,
        "key": "2024-08-17"
    },
    {
        "value": 5,
        "key": "2024-08-18"
    },
    {
        "value": 2,
        "key": "2024-08-19"
    },
    {
        "value": 1,
        "key": "2024-08-20"
    },
    {
        "value": 7,
        "key": "2024-08-21"
    },
    {
        "value": 9,
        "key": "2024-08-22"
    },
    {
        "value": 2,
        "key": "2024-08-23"
    }
];

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
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
        permission: ['PROFILE_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Users',
                icon: 'user-add',
                link: '/setting/mgUsers',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
                permission: ['USER_PERMISSION']
            },
            {
                name: 'Organization',
                icon: 'deployment-unit',
                link: '/setting/mgOrganization',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
                permission: ['ORGANIZATION_PERMISSION']
            },
            {
                name: 'Role & Profile',
                icon: 'pushpin',
                link: '/setting/mgRPP',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
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
        roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_DEV', 'ROLE_DB'],
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
                name: 'Lookups',
                icon: 'control',
                link: '/setting/mgLookup',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                permission: ['LOOKUP_PERMISSION']
            },
            {
                name: 'E-Variable',
                icon: 'font-colors',
                link: '/setting/mgEvariable',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
                permission: ['EVARIABL_PERMISSION']
            },
            {
                name: 'Template',
                icon: 'mail',
                link: '/setting/mgTemplate',
                roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV', 'ROLE_DB'],
                permission: ['TEMPLATE_PERMISSION']
            }
        ]
    },
    {
        name: 'Support',
        icon: 'wifi',
        roles: ['ROLE_DEV', 'ROLE_DB'],
        permission: ['SUPPORT_SETTING_PERMISSION'],
        childLinks: [
            {
                name: 'Query Inquiry',
                icon: 'console-sql',
                link: '/setting/inquery',
                roles: ['ROLE_DEV', 'ROLE_DB'],
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
    DYNAMIC_CONDITION: 'DYNAMIC_CONDITION',
    ACCOUNT_TYPE: 'ACCOUNT_TYPE'
}