import $ from 'jquery';
import logo from '../images/logo-icon.png';
import { Clock } from './Clock';
import { ErrorResponseHandler } from './ErrorResponseHandler';

export class Toast{
    constructor(){
        this.errorHandler = new ErrorResponseHandler();
        this._parent = $('body').find('.toast-container');
        if(!this._parent.length) {
            const parent = $('<div>').addClass('toast-container position-fixed p-3').css('z-index', 2000);
            $('body').prepend(parent);
            this._parent = parent;
        }
    }

    _buildToast(subMessage, message, color, interval){
        let minute = 0;
        const clock = new Clock();
        const toast = $('<div/>').addClass(`toast show border-3 ${color.replace('text', 'border')}`);
        const header = $('<div/>').addClass('toast-header py-1');
        const image = $('<img/>').addClass('rounded me-2').attr('src', logo).css('width', '15px');
        const title = $('<strong/>').addClass('me-auto text-dark').text(subMessage);
        const info = $('<small/>').addClass('text-muted').text('just now');
        const close = $('<button/>').addClass('btn-close').on('click', ()=>toast.remove());
        const body = $('<div/>').addClass(`toast-body py-1 ${color}`).text(this.errorHandler.message(message));
        header.append(image, title, info, close);
        clock.setReference(info);
        clock.setInterval(60);
        clock.startTimer((t)=>{
            minute ++;
            let msg = ' minute ago';
            if(minute > 1) msg = ' minutes ago';
            info.text(minute + msg);
        });
        interval && setTimeout(()=> $(toast).hide('slow').promise().then(()=>$(toast).remove()), interval);
        return toast.append(header, body);
    }

    notify(title, message, interval=5000){
        this._buildToast(title, message, 'text-primary', interval).appendTo(this._parent);
    }

    success(title, message, interval=5000){
        this._buildToast(title, message, 'text-success', interval).appendTo(this._parent);
    }

    warning(title, message, interval=5000){
        this._buildToast(title, message, 'text-warning', interval).appendTo(this._parent);
    }

    error(title, message, interval=5000){
        this._buildToast(title, message, 'text-danger', interval).appendTo(this._parent);
    }
}

export const toast = new Toast();
