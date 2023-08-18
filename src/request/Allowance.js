export class Allowance{
    constructor(API){
        this.api = API;
    }

    async create(data){
        return await this.api.post('/create/allowance', data);
    }

    async edit(data){
        return await this.api.post('/edit/allowance', data);
    }

    async delete(id){
        return await this.api.post('/delete/allowance', {id});
    }

    async deleteReport(id){
        return await this.api.post('/delete/allowance/report', {id});
    }

    async list(){
        return await this.api.get('/list/allowances', null);
    }
}
