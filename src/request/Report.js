export class Report{
    constructor(API){
        this.api = API;
    }

    async create(data){
        return await this.api.post('/create/report', data);
    }

    async edit(data){
        return await this.api.post('/edit/report', data);
    }

    async bulkCreate(data){
        return await this.api.post('/create/bulk/reports', data);
    }

    async bulkClone(){
        return await this.api.post('/clone/bulk/reports', null);
    }

    async report(id){
        return await this.api.get('/fetch/report', {id});
    }

    async listByUser(id){
        return await this.api.get('/list/user/report', {id});
    }

    async listBulkReports(){
        return await this.api.get('/list/bulk/reports', null);
    }

    async listEachReportByIdArray(reportIdArray){
        return await this.api.get('/list/reports/by/specified/reportId', {reportIdArray});
    }

    async searchByDate(from, to){
        return await this.api.get('/search/bulk/reports/by/date', {from, to});
    }

    async searchByDateAndUserId(from, to, id){
        return await this.api.get('/list/user/reports/by/date', {from, to, id});
    }

    async listPeriods(){
        return await this.api.get('/list/periods', null);
    }

    async calculateReport(data){
        return await this.api.get('/calculate/report', data);
    }
}