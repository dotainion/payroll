import { token } from "../utils/Token";

export class FetchSession{
    constructor(API){
        this.api = API;
    }

    async getSession(){
        return await this.api.get('/fetch/token', {token: token.get()}, {stopReAuthentication: true});
    }
}