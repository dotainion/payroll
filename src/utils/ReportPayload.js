import $ from 'jquery';
import { DateHelper } from './DateHelper';
import { toast } from './Toast';

class ReportPayload{
    excludedReportIds = [];

    reset(){
        this.payloads = [];
    }

    list(){
        return this.payloads;
    }

    first(){
        return this.payloads?.[0] || null;
    }

    addExcluded(reportId){
        if(!this.excludedReportIds.includes(reportId)){
            this.excludedReportIds.push(reportId);
        }
    }

    removeExcluded(reportId){
        let reportIds = [];
        this.excludedReportIds.forEach((id)=>{
            if(reportId !== id) reportIds.push(id);
        });
        this.excludedReportIds = reportIds;
    }

    excluded(reportId){
        return this.excludedReportIds.includes(reportId);
    }

    allowances(instance){
        let data = [];
        $(instance).find('[data-report-allowances]').find('[data-addon]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['type'] = $(addon).find('[name=type]').val();
            json['rate'] = $(addon).find('[name=rate]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            json['rateAmount'] = $(addon).find('[name=rateAmount]').val();
            data.push(json);
        });
        return data;
    }

    deductions(instance){
        let data = [];
        $(instance).find('[data-report-deductions]').find('[data-addon]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['type'] = $(addon).find('[name=type]').val();
            json['rate'] = $(addon).find('[name=rate]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            json['rateAmount'] = $(addon).find('[name=rateAmount]').val();
            data.push(json);
        });
        return data;
    }

    noPayLeaveAllowance(instance){
        let data = [];
        $(instance).find('[data-report-allowances]').find('[data-no-pay-leave]').each((i, addon)=>{
            let json = {};
            if(!$(addon).find('[name=from]')[0].valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=from]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=to]')[0].valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=to]')[0].valueAsDate).toSqlString();
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            data.push(json);
        });
        return data;
    }

    noPayLeaveDeduction(instance){
        let data = [];
        $(instance).find('[data-report-deductions]').find('[data-no-pay-leave]').each((i, addon)=>{
            let json = {};
            if(!$(addon).find('[name=from]')[0].valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=from]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=to]')[0].valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=to]')[0].valueAsDate).toSqlString();
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            data.push(json);
        });
        return data;
    }

    loanAllowances(instance){
        let data = [];
        $(instance).find('[data-report-allowances]').find('[data-loan]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=bank]').val();
            json['number'] = $(addon).find('[name=number]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            data.push(json);
        });
        return data;
    }

    loanDeductions(instance){
        let data = [];
        $(instance).find('[data-report-deductions]').find('[data-loan]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=bank]').val();
            json['number'] = $(addon).find('[name=number]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            data.push(json);
        });
        return data;
    }

    sickLeave(instance){
        let data = [];
        $(instance).find('[data-report-sickleaves]').find('[data-sick-leave-addon]').each((i, addon)=>{
            let json = {};
            if(!$(addon).find('[name=from]')[0].valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=from]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=to]')[0].valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=to]')[0].valueAsDate).toSqlString();
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            data.push(json);
        });
        return data;
    }

    overtime(instance){
        let data = [];
        $(instance).find('[data-report-allowances]').find('[data-overtime]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['hours'] = $(addon).find('[name=hours]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['linkId'] = $(addon).find('[name=linkId]').val();
            json['formularId'] = $(addon).find('[name=formular]').val();
            data.push(json);
        });
        return data;
    }

    period(instance){
        let json = {};
        $(instance).find('[data-report-period]').each((i, addon)=>{
            if(!$(addon).find('[name=from]').length) return;
            if(!$(addon).find('[name=from]')[0]?.valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=from]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=to]')[0]?.valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=to]')[0].valueAsDate).toSqlString();
        });
        return json;
    }

    prorate(instance){
        let json = {};
        $(instance).find('[data-report-prorate]').each((i, addon)=>{
            if(!$(addon).find('[name=prorateFrom]').length) return;
            if(!$(addon).find('[name=prorateFrom]')[0]?.valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=prorateFrom]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=prorateTo]')[0]?.valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=prorateTo]')[0].valueAsDate).toSqlString();
        });
        return json;
    }

    notified(instance){
        let data = [];
        $(instance).find('[data-alert-container]').find('[data-tax-alert]').each((i, taxAlert)=>{
            let json = {};
            json['id'] = $(taxAlert).find('[name=id]').val();
            json['notify'] = $(taxAlert).find('[name=notify]').val() === 'notified';
            data.push(json);
        });
        return data;
    }

    payload(){
        this.reset();
        $('[data-report-instance]').each((i, instance)=>{
            if(this.excluded($(instance).find('input[name=reportId]').val())) return;
            let data = {};
            data['id'] = $(instance).find('input[name=userId]').val();
            data['period'] = this.period(instance);
            data['prorate'] = this.prorate(instance);
            data['notified'] = this.notified(instance);
            data['overtime'] = this.overtime(instance);
            data['allowance'] = this.allowances(instance);
            data['deduction'] = this.deductions(instance);
            data['sickLeaves'] = this.sickLeave(instance);
            data['loanAllowances'] = this.loanAllowances(instance);
            data['loanDeductions'] = this.loanDeductions(instance);
            data['noPayLeaveAllowances'] = this.noPayLeaveAllowance(instance);
            data['noPayLeaveDeductions'] = this.noPayLeaveDeduction(instance);
            this.payloads.push(data);
        });
        return this;
    }
}

export const reportPayload = new ReportPayload();