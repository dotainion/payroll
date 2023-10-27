export class Documents{
    constructor(API){
        this.api = API;
    }

    async costTypes(data){
        return await this.api.get('/fetch/cost/types', null);
    }

    async rateTypes(){
        return await this.api.get('/fetch/rate/types', null);
    }

    async allowanceDeductionIdLink(){
        return await this.api.get('/list/allowance/deduction/doc/id/link', null);
    }
}