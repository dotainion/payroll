import $ from 'jquery';

export class ReAuthenticate{
    open(){
        $('[data-re-authenticated]').show('fast');
    }

    close(){
        $('[data-re-authenticated]').hide('fast');
    }
}
