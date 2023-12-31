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

    addDays(days){
        const currentDate = this.date.getDate();
        this.date.setDate(currentDate + parseInt(days || 0));
    }

    isValid(){
        return !!this.date;
    }

    weekDays(){
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }

    months(name){
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
    }

    monthIndex(name){
        let index = 0;
        for(let month of this.months()){
            if(month === name) return index;
            index ++;
        }
    }
}