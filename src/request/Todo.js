export class Todo{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/todo', data);
    }

    async delete(id){
        return await this.api.post('/delete/todo', {id});
    }

    async complete(id){
        return await this.api.post('/complete/todo', {id, complete: true});
    }

    async incomplete(id){
        return await this.api.post('/complete/todo', {id, complete: false});
    }

    async assignTo(id, userId){
        return await this.api.post('/assign/todo/to/user', {id, userId});
    }

    async listByUser(data){
        return await this.api.post('/list/todo/by/user', data);
    }

    async listOverdueByUser(userId){
        return await this.api.post('/list/overdue/todo', {userId});
    }
}