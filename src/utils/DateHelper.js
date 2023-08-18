export class DateHelper{
    constructor(date){
        this.date = date;
    }

    toSqlString(){
        const date = this.date.toISOString().split('T');
        const subString = date[1].substring(date[1].indexOf('.'), date[1].length);
		return date[0] + ' ' + date[1].replace(subString, '');
    }

    sqlStringToInput(data){
        return data.split(' ')[0];
    }

    isValid(){
        return !!this.date;
    }
}