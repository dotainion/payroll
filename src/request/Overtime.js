export class Overtime{
    constructor(API){
        this.api = API;
    }

    async setOTSetting(data){
        return await this.api.get('/set/overtime/settings', data);
    }

    async fetchOTSettings(id){
        return await this.api.get('/fetch/overtime/settings', {id});
    }

    async fetchOTSettingsAndPassUserId(id, userId){
        //userId is optional.. its use to fetch the user salary and do a calculation based on that
        return await this.api.get('/fetch/overtime/settings', {id, userId});
    }

    async deleteOTSettings(id){
        return await this.api.get('/delete/overtime/settings', {id});
    }

    async listOTSettings(){
        return await this.api.get('/list/overtime/settings', null);
    }

    async listOTSettingsAndPassUserId(userId){
        //userId is optional.. its use to fetch the user salary and do a calculation based on that
        return await this.api.get('/list/overtime/settings', {userId});
    }
}