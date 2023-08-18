export class Mail{
    constructor(API){
        this.api = API;
    }

    async send(data){
        return await this.api.post('/send/payslip/mail', data);
    }

    async sendList(data){
        return await this.api.post('/send/bulk/payslip/mail', {payslips: data});
    }
}
