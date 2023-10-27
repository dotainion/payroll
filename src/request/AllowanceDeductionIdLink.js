export class AllowanceDeductionIdLink{
    constructor(API){
        this.api = API;
    }

    async set(id, cmd){
        return await this.api.post('/set/allowance/deduction/id/link', {id, cmd});
    }

    async delete(id){
        return await this.api.post('/delete/allowance/deduction/id/link', {id});
    }

    async list(){
        return await this.api.get('/list/allowance/deduction/id/link', null);
    }
}
