class Workspace{
    _nested = '';
    default = () => '/workspace/*';
    employees = () => this._nested + 'employees';
    createReport = (userId=':userId') => this._nested + 'create/employee/report/' + userId;
    editReport = (reportId=':reportId') => this._nested + 'edit/employee/report/' + reportId;
    createEmployee = () => this._nested + 'employee/create';
    editEmployee = (userId=':userId') => this._nested + 'employee/edit/' + userId;
    employeeReport = (userId=':userId') => this._nested + 'employee/report/' + userId;
    bulkReport = () => this._nested + 'bulk/report';
    employeeSettings = (userId=':userId') => this._nested + 'employee/settings/' + userId;
    bulkPayslip = () => this._nested + 'invoice/bulk/payslip';
    employeePayslip = (reportId=':reportId') => this._nested + 'invoice/employee/payslip/' + reportId;
    eachEmployeePayslip = (eachReportId=':eachReportId') => this._nested + 'invoice/each/employee/payslip/' + eachReportId;
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Settings{
    _nested = '';
    default = () => '/settings/*';
    profile = () => this._nested + 'profile';
    security = () => this._nested + 'security';
    notifications = () => this._nested + 'notifications';
    allowances = () => this._nested + 'allowances';
    deductions = () => this._nested + 'deductions';
    departments = () => this._nested + 'departments';
    banks = () => this._nested + 'banks';
    settings = () => this._nested + 'system/settings/*';
    tax = () => this._nested + 'tax';
    sickLeave = () => this._nested + 'sickleave';
    overtime = () => this._nested + 'overtime';
    emailNotificationSetup = () => this._nested + 'email/notificatin/setup';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Business{
    _nested = '';
    default = () => '/';
    aboutYou = () => this._nested + '/business/about/you';
    profile = () => this._nested + '/business/profile';
    credentials = () => this._nested + '/business/credentials';
    finalize = () => this._nested + '/business/finalize';
}

class Routes {
    constructor(){
        this.utils = new Utils();
    }
    default = () => '/';
    signin = () => '/signin';
    passRecovery = () => '/password/recovery';
    updateCredentialByToken = (refreshToken=':refreshToken') => '/update/credential/by/token/' + refreshToken;
    workspace(){
        const route = new Workspace();
        route._nested = '';
        return route;
    }
    settings(){
        const route = new Settings();
        route._nested = '';
        return route;
    }
    business(){
        const route = new Business();
        route._nested = '';
        return route;
    }
}

class Utils{
    stringify(arrayForUrl){
        return `[${arrayForUrl.join(',')}]`;
    }

    parse(urlStringArray){
        const eachReportId = urlStringArray.replace('[', '').replace(']', '');
        return eachReportId.split(',')
    }
}

export const routes = new Routes();

