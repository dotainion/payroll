export class Departments{
    constructor(API){
        this.api = API;
    }

    async create(data){
        
    }

    async list(){
        return await this.api.get('/list/departments', null);
    }
}