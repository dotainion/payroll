export class PasswordValidation{
    //specialChars = ['!', '@', '#', '$', '%' , '^', '&', '*', '(', ')'];
    _message;

    isValid(password){
        const characters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (password?.length < 7) {
            this._message = 'Your password needs a minimum of 7 characters.';
            return false;
        }  else if (password?.search(/[a-z]/) < 0) {
            this._message = 'Your password needs a lower case letter.';
            return false;
        } else if(password?.search(/[A-Z]/) < 0) {
            this._message = 'Your password needs an uppser case letter.';
            return false;
        } else if (password?.search(/[0-9]/) < 0) {
            this._message = 'Your password needs a number.';
            return false;
        } else if (!characters.test(password)) {
            this._message = 'Your password needs a charactor.';
            return false;
        }
        return true;
    }

    message(){
        return this._message;
    }
}