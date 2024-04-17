import $ from 'jquery';

class LoanAddOn{
    reset(){
        this.payload = [];
    }

    build(){
        this.reset();
        $('[data-loan]').each((i, addon)=>{
            let json = {};
            json['bank'] = $(addon).find('[name=bank]').val();
            json['number'] = $(addon).find('[name=number]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            this.payload.push(json);
        });
        return this.payload;
    }
}

class AddOn{
    reset(){
        this.payload = [];
    }

    build(parentElement){
        this.reset();
        let element = $('[data-addon]');
        if(parentElement)  element = $(parentElement).find('[data-addon]');
        $(element).each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['name'] = $(addon).find('[name=name]').val();
            json['type'] = $(addon).find('[name=type]').val();
            json['rate'] = $(addon).find('[name=rate]').val();
            json['amount'] = $(addon).find('[name=amount]').val();
            json['rateAmount'] = $(addon).find('[name=rateAmount]').val();
            json['taxExemption'] = $(addon).find('[name=taxExemption]').val() === 'true';
            this.payload.push(json);
        });
        return this.payload;
    }
}

class Banks{
    reset(){
        this.payload = [];
    }

    build(){
        this.reset();
        $('[data-banks]').each((i, addon)=>{
            let json = {};
            json['id'] = $(addon).find('[name=id]').val();
            json['bankId'] = $(addon).find('[name=bankId]').val();
            json['number'] = $(addon).find('[name=number]').val();
            this.payload.push(json);
        });
        return this.payload;
    }
}

class AddonsPayload{
    constructor(){
        this.addon = new AddOn();
        this.loan = new LoanAddOn();
        this.banks = new Banks();
    }
}

export const payload = new AddonsPayload();