export class Deduction{
    constructor(API){
        this.api = API;
    }

    async create(data){
        return await this.api.post('/create/deduction', data);
    }

    async edit(data){
        return await this.api.post('/edit/deduction', data);
    }

    async delete(id){
        return await this.api.post('/delete/deduction', {id});
    }

    async deleteReport(id){
        return await this.api.post('/delete/deduction/report', {id});
    }

    async list(){
        return await this.api.get('/list/deductions', null);
    }
}