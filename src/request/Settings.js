export class Settings{
    constructor(API){
        this.api = API;
    }

    async fetchSickLeaveSettings(){
        return await this.api.get('/fetch/sickleave/settings', null);
    }

    async setSickLeaveSettings(data){
        return await this.api.get('/set/sickleave/settings', data);
    }

    async fetchProrateSettings(){
        return await this.api.get('/fetch/prorate/settings', null);
    }

    async setProrateSettings(data){
        return await this.api.get('/set/prorate/settings', data);
    }
}