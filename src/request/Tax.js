export class Tax{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/tax/setting', data);
    }

    async delete(id){
        return await this.api.post('/delete/tax/setting', {id});
    }

    async list(){
        return await this.api.post('/list/tax/setting', null);
    }
}