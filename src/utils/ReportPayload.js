import $ from 'jquery';
import { DateHelper } from './DateHelper';
import { toast } from './Toast';

class ReportPayload{
    reset(){
        this.payloads = [];
    }

    list(){
        return this.payloads;
    }

    first(){
        return this.payloads?.[0] || null;
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
            data.push(json);
        });
        return data;
    }

    sickLeave(instance){
        let data = [];
        $(instance).find('[data-report-sickleaves]').each((i, addon)=>{
            let json = {};
            if(!$(addon).find('[name=from]')[0].valueAsDate) json['from'] = '';
            else json['from'] = new DateHelper($(addon).find('[name=from]')[0].valueAsDate).toSqlString();
            if(!$(addon).find('[name=to]')[0].valueAsDate) json['to'] = '';
            else json['to'] = new DateHelper($(addon).find('[name=to]')[0].valueAsDate).toSqlString();
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            data.push(json);
        });
        return data;
    }

    payload(){
        this.reset();
        $('[data-report-instance]').each((i, instance)=>{
            let data = {};
            data['id'] = $(instance).find('input[name=userId]').val();
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