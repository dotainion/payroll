export class Departments{
    constructor(API){
        this.api = API;
    }

    async create(name){
        return await this.api.get('/create/department', {name});
    }

    async edit(id, name){
        return await this.api.get('/edit/department', {id, name});
    }

    async delete(id){
        return await this.api.get('/delete/department', {id});
    }

    async list(){
        return await this.api.get('/list/departments', null);
    }
}