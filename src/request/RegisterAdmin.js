export class RegisterAdmin{
    constructor(API){
        this.api = API;
    }

    async registerBusiness(data){
        return await this.api.get('/register/business', data);
    }

    async editBusiness(data){
        return await this.api.get('/edit/business', data);
    }

    async fetchBusiness(){
        return await this.api.get('/fetch/business', null);
    }
}