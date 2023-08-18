class Token{
    TOKEN_KEY = 'refresh-token';

    constructor(){
        
    }

    set(data){
        window.localStorage.setItem(this.TOKEN_KEY, data);
    }

    get(){
        return window.localStorage.getItem(this.TOKEN_KEY);
    }
}

export const token = new Token();