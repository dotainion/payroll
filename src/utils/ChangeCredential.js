import $ from 'jquery';

export class ChangeCredential{
    open(){
        $('[data-change-credential]').show('fast');
    }

    close(){
        $('[data-change-credential]').hide('fast');
    }
}
