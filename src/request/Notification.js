export class Notification{
    constructor(API){
        this.api = API;
    }

    async fetchSetup(data){
        return await this.api.post('/fetch/notification/setup', null);
    }

    async fetchUserSetting(userId){
        return await this.api.post('/fetch/user/notification/setting', {userId});
    }

    async setSetup(data){
        return await this.api.post('/set/notification/setup', data);
    }

    async setUserSetting(data){
        return await this.api.post('/set/user/notification/setting', data);
    }
}
