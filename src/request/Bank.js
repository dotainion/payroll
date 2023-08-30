export class Bank{
    constructor(API){
        this.api = API;
    }

    async create(name){
        return await this.api.post('/create/bank', {name});
    }

    async createBankLink(data){
        return await this.api.post('/create/bank/link', data);
    }

    async edit(id, name){
        return await this.api.post('/edit/bank', {id, name});
    }

    async editBankLink(data){
        return await this.api.post('/edit/bank/link', data);
    }

    async delete(id){
        return await this.api.post('/delete/bank', {id});
    }

    async deleteUserBank(id){
        return await this.api.post('/delete/user/bank', {id});
    }

    async linkUserToBank(name){
        return await this.api.post('/link/user/to/bank', {name});
    }

    async listByUser(id){
        return await this.api.get('/list/user/banks', {id});
    }

    async list(){
        return await this.api.get('/list/banks', null);
    }
}