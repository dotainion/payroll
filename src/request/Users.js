export class Users{
    constructor(API){
        this.api = API;
    }

    async fetchUser(id){
        return await this.api.get('/fetch/user', {id});
    }

    async listUsers(){
        return await this.api.get('/list/users', null);
    }

    async fetchHasCredential(id){
        return await this.api.post('/fetch/has/credential', {id});
    }

    async fetchHasCredentialByRefreshToken(refreshToken){
        return await this.api.post('/fetch/has/credential/by/refreshtoken', {refreshToken});
    }

    async assignCredential(id){
        return await this.api.post('/assing/user/credential', {id});
    }

    async updateCredentialByRefreshToken(data){
        return await this.api.post('/update/credential/with/refersh/token', data);
    }

    async edit(data){
        return await this.api.post('/edit/user', data);
    }

    async create(data){
        return await this.api.post('/create/user', data);
    }

    async addInPayroll(id){
        return await this.api.post('/add/to/user/collection', {id});
    }

    async removeFromPayroll(id){
        return await this.api.post('/remove/from/user/collection', {id});
    }

    async listUsersWithHasCredential(){
        return await this.api.post('/list/users/with/has/credential', null);
    }
}