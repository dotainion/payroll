export class Authenticate{
    constructor(API){
        this.api = API;
    }

    async signin(email, password){
        return await this.api.post('/signin', {email, password});
    }

    async recoverAccount(email){
        return await this.api.post('/recover/account', {email});
    }

    async changePassword(id, currentPassword, password){
        return await this.api.post('/update/credential', {id, currentPassword, password});
    }

    async logout(){
        return await this.api.post('/logout', null);
    }
}