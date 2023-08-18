export class CostTypeAndRateHandler{
    Rate = '1';
    Percentage = '2';
    DollarAmount = '3';

    costDisplayToValue(displayName){
        if(displayName === 'Rate') return '1';
        if(displayName === 'Percentage') return '2';
        if(displayName === 'Dollar amount') return '3';
        return null;
    }

    costValueToDisplay(value){
        if(value === this.Rate) return 'Rate';
        if(value === this.Percentage) return 'Percentage';
        if(value === this.DollarAmount) return 'Dollar amount';
        return null;
    }

    rateDisplayToValue(displayName){
        if(displayName === 'Per Hour') return 'h';
        if(displayName === 'Per Day') return 'd';
        if(displayName === 'Per Week') return 'w';
        if(displayName === 'Per Month') return 'm';
        if(displayName === 'Per Year') return 'y';
        return null;
    }

    rateValueToDisplay(value){
        if(value === 'h') return 'Per Hour';
        if(value === 'd') return 'Per Day';
        if(value === 'w') return 'Per Week';
        if(value === 'm') return 'Per Month';
        if(value === 'y') return 'Per Year';
        return null;
    }
}

