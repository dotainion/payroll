export class Loan{
    constructor(API){
        this.api = API;
    }

    async listAllowanceByUser(id){
        return await this.api.get('/list/user/loan/allowances', {id});
    }

    async listDeductionByUser(id){
        return await this.api.get('/list/user/loan/deductions', {id});
    }
}